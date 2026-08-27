export type ErrorCategory =
  | 'SyntaxError'
  | 'NameError'
  | 'TypeError'
  | 'ValueError'
  | 'IndexError'
  | 'KeyError'
  | 'ImportError'
  | 'ModuleNotFoundError'
  | 'AttributeError'
  | 'RuntimeError'
  | 'CompilationError'
  | 'Timeout'
  | 'MemoryError'
  | 'PermissionError'
  | 'MissingInput'
  | 'EnvironmentError'
  | 'UnknownError';

export interface ParsedExecutionError {
  language: string;
  errorType: ErrorCategory | string;
  message: string;
  line?: number;
  column?: number;
  file?: string;
  traceback: string;
  rawStderr: string;
  isMissingInput?: boolean;
  isEnvironmentError?: boolean;
}

export class ErrorParser {
  static parse(rawStderr: string, language: string, code: string, userInput?: string): ParsedExecutionError {
    const stderr = rawStderr || '';
    const lang = (language || 'python').toLowerCase();

    // Check if compiler / interpreter is missing in system environment
    const isCmdMissing = /'([^']+)'\s+is not recognized as an internal or external command/i.test(stderr) ||
                         /command not found:\s*([^\s]+)/i.test(stderr) ||
                         /spawn\s+([^\s]+)\s+ENOENT/i.test(stderr);

    if (isCmdMissing) {
      const match = stderr.match(/'([^']+)'\s+is not recognized/i) || stderr.match(/command not found:\s*([^\s]+)/i) || stderr.match(/spawn\s+([^\s]+)\s+ENOENT/i);
      const cmd = match ? match[1] : 'Compiler/Runtime';
      return {
        language: lang,
        errorType: 'EnvironmentError',
        message: `${cmd} compiler/runtime is not installed or not in your system PATH.`,
        line: undefined,
        traceback: stderr,
        rawStderr: stderr,
        isEnvironmentError: true
      };
    }

    let parsed: ParsedExecutionError;

    if (lang === 'python' || lang === 'py') {
      parsed = this.parsePythonError(stderr, code);
    } else if (lang === 'js' || lang === 'javascript' || lang === 'ts' || lang === 'typescript') {
      parsed = this.parseNodeError(stderr, code, lang);
    } else if (lang === 'java') {
      parsed = this.parseJavaError(stderr, code);
    } else if (lang === 'c' || lang === 'cpp' || lang === 'c++') {
      parsed = this.parseCError(stderr, code, lang);
    } else {
      parsed = {
        language: lang,
        errorType: 'UnknownError',
        message: stderr.trim().split('\n')[0] || 'Unknown execution error',
        traceback: stderr,
        rawStderr: stderr
      };
    }

    // Detect MissingInput (EOFError when input() was called but userInput was empty or exhausted)
    if (
      stderr.includes('EOFError') ||
      stderr.includes('EOF when reading a line') ||
      stderr.includes('NoSuchElementException') ||
      (code.includes('input(') && (!userInput || userInput.trim().length === 0) && stderr.includes('EOF'))
    ) {
      parsed.errorType = 'MissingInput';
      parsed.isMissingInput = true;
      parsed.message = 'Program requires interactive user input (STDIN). Please provide input values in the STDIN panel.';
    }

    parsed.errorType = this.classifyError(parsed.errorType, stderr);
    return parsed;
  }

  static classifyError(detectedType: string, stderr: string): ErrorCategory {
    if (stderr.includes('EOFError') || stderr.includes('EOF when reading a line') || detectedType === 'MissingInput') {
      return 'MissingInput';
    }
    if (stderr.includes('timed out') || stderr.includes('Timeout') || detectedType === 'Timeout') {
      return 'Timeout';
    }
    if (stderr.includes('MemoryError') || stderr.includes('OutOfMemory') || detectedType === 'MemoryError') {
      return 'MemoryError';
    }
    if (stderr.includes('PermissionError') || stderr.includes('AccessDenied')) {
      return 'PermissionError';
    }
    if (stderr.includes('ModuleNotFoundError') || detectedType === 'ModuleNotFoundError') {
      return 'ModuleNotFoundError';
    }
    if (stderr.includes('ImportError') || detectedType === 'ImportError') {
      return 'ImportError';
    }
    if (stderr.includes('SyntaxError') || stderr.includes('IndentationError') || detectedType === 'SyntaxError') {
      return 'SyntaxError';
    }
    if (stderr.includes('NameError') || stderr.includes('ReferenceError') || detectedType === 'NameError') {
      return 'NameError';
    }
    if (stderr.includes('TypeError') || detectedType === 'TypeError') {
      return 'TypeError';
    }
    if (stderr.includes('ValueError') || detectedType === 'ValueError') {
      return 'ValueError';
    }
    if (stderr.includes('IndexError') || detectedType === 'IndexError') {
      return 'IndexError';
    }
    if (stderr.includes('KeyError') || detectedType === 'KeyError') {
      return 'KeyError';
    }
    if (stderr.includes('AttributeError') || detectedType === 'AttributeError') {
      return 'AttributeError';
    }
    if (detectedType === 'EnvironmentError' || stderr.includes('is not recognized as an internal') || stderr.includes('command not found')) {
      return 'EnvironmentError';
    }
    if (stderr.includes('CompilationError') || stderr.includes('error:') || detectedType === 'CompilationError') {
      return 'CompilationError';
    }
    if (stderr.includes('RuntimeError') || detectedType === 'RuntimeError') {
      return 'RuntimeError';
    }

    const standardCategories: ErrorCategory[] = [
      'SyntaxError', 'NameError', 'TypeError', 'ValueError', 'IndexError',
      'KeyError', 'ImportError', 'ModuleNotFoundError', 'AttributeError',
      'RuntimeError', 'CompilationError', 'Timeout', 'MemoryError',
      'PermissionError', 'MissingInput', 'EnvironmentError'
    ];

    if (standardCategories.includes(detectedType as ErrorCategory)) {
      return detectedType as ErrorCategory;
    }

    return 'UnknownError';
  }

  private static parsePythonError(stderr: string, code: string): ParsedExecutionError {
    const lines = stderr.trim().split(/\r?\n/);
    const lastLine = lines[lines.length - 1] || '';

    let errorType = 'RuntimeError';
    let message = lastLine;

    const match = lastLine.match(/^([A-Za-z0-9_]+Error|SyntaxError|IndentationError):\s*(.*)$/);
    if (match) {
      errorType = match[1];
      message = match[2] || match[1];
    }

    let lineNum: number | undefined = undefined;
    const fileMatches = Array.from(stderr.matchAll(/File "([^"]+)", line (\d+)/g));
    if (fileMatches.length > 0) {
      lineNum = parseInt(fileMatches[fileMatches.length - 1][2], 10);
    } else {
      const syntaxLineMatch = stderr.match(/line (\d+)/i);
      if (syntaxLineMatch) {
        lineNum = parseInt(syntaxLineMatch[1], 10);
      }
    }

    return {
      language: 'python',
      errorType,
      message,
      line: lineNum,
      traceback: stderr,
      rawStderr: stderr
    };
  }

  private static parseNodeError(stderr: string, code: string, lang: string): ParsedExecutionError {
    const lines = stderr.trim().split(/\r?\n/);
    let errorType = 'NameError';
    let message = lines[0] || 'JavaScript execution failed';

    const firstLine = lines[0] || '';
    const match = firstLine.match(/^([A-Za-z0-9_]+Error):\s*(.*)$/);
    if (match) {
      errorType = match[1] === 'ReferenceError' ? 'NameError' : match[1];
      message = match[2];
    }

    let lineNum: number | undefined = undefined;
    let colNum: number | undefined = undefined;
    const lineColMatch = stderr.match(/:(\d+):(\d+)/);
    if (lineColMatch) {
      lineNum = parseInt(lineColMatch[1], 10);
      colNum = parseInt(lineColMatch[2], 10);
    }

    return {
      language: lang,
      errorType,
      message,
      line: lineNum,
      column: colNum,
      traceback: stderr,
      rawStderr: stderr
    };
  }

  private static parseJavaError(stderr: string, code: string): ParsedExecutionError {
    const lines = stderr.trim().split(/\r?\n/);
    let errorType = 'CompilationError';
    let message = lines[0] || 'Java execution failed';
    let lineNum: number | undefined = undefined;

    const javaLineMatch = stderr.match(/:(\d+):\s*error:\s*(.*)$/m);
    if (javaLineMatch) {
      lineNum = parseInt(javaLineMatch[1], 10);
      message = javaLineMatch[2];
      errorType = 'CompilationError';
    } else {
      const exMatch = stderr.match(/Exception in thread "[^"]+" ([a-zA-Z0-9_.]+):\s*(.*)$/m);
      if (exMatch) {
        errorType = exMatch[1].split('.').pop() || exMatch[1];
        message = exMatch[2];
      }
    }

    return {
      language: 'java',
      errorType,
      message,
      line: lineNum,
      traceback: stderr,
      rawStderr: stderr
    };
  }

  private static parseCError(stderr: string, code: string, lang: string): ParsedExecutionError {
    let errorType = 'CompilationError';
    let message = stderr.trim().split('\n')[0] || 'Compilation error';
    let lineNum: number | undefined = undefined;
    let colNum: number | undefined = undefined;

    const cMatch = stderr.match(/:(\d+):(\d+):\s*error:\s*(.*)$/m);
    if (cMatch) {
      lineNum = parseInt(cMatch[1], 10);
      colNum = parseInt(cMatch[2], 10);
      message = cMatch[3];
    }

    return {
      language: lang,
      errorType,
      message,
      line: lineNum,
      column: colNum,
      traceback: stderr,
      rawStderr: stderr
    };
  }
}
