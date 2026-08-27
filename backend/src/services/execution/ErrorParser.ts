export type ErrorCategory =
  | 'SyntaxError'
  | 'NameError'
  | 'TypeError'
  | 'ValueError'
  | 'IndexError'
  | 'KeyError'
  | 'ZeroDivisionError'
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
  errorSnippet?: string;
  file?: string;
  traceback: string;
  rawStderr: string;
  isMissingInput?: boolean;
  isEnvironmentError?: boolean;
  whatHappened?: string;
  whyItHappened?: string;
  howToFix?: string;
}

export class ErrorParser {
  static parse(rawStderr: string, language: string, code: string, userInput?: string): ParsedExecutionError {
    const stderr = rawStderr || '';
    const lang = (language || 'python').toLowerCase();
    const codeLines = (code || '').split(/\r?\n/);

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
        isEnvironmentError: true,
        whatHappened: `The system could not locate the ${cmd} executable.`,
        whyItHappened: `The compiler is not in your system environment PATH.`,
        howToFix: `Install the appropriate compiler/runtime or ensure it is added to your PATH environment variable.`
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

    // Fallback: If line was not detected in stderr, scan code heuristics
    if (!parsed.line || parsed.line <= 0) {
      parsed.line = this.detectLineFromCode(code, parsed.errorType, stderr, lang);
    }

    // Populate exact code snippet at errorLine
    if (parsed.line && parsed.line > 0 && parsed.line <= codeLines.length) {
      parsed.errorSnippet = codeLines[parsed.line - 1].trim();
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
      parsed.whatHappened = 'Program called input() but the input buffer was empty.';
      parsed.whyItHappened = 'The execution reached an interactive prompt without provided input stream.';
      parsed.howToFix = 'Type your input value in the STDIN input box and click "Run with Input".';
    }

    parsed.errorType = this.classifyError(parsed.errorType, stderr);
    this.enrichExplanations(parsed, code);

    return parsed;
  }

  static classifyError(detectedType: string, stderr: string): ErrorCategory {
    if (stderr.includes('EOFError') || stderr.includes('EOF when reading a line') || detectedType === 'MissingInput') {
      return 'MissingInput';
    }
    if (stderr.includes('ZeroDivisionError') || stderr.includes('division by zero') || stderr.includes('/ by zero') || detectedType === 'ZeroDivisionError') {
      return 'ZeroDivisionError';
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
    if (stderr.includes('NameError') || stderr.includes('ReferenceError') || stderr.includes('not defined') || stderr.includes('was not declared') || detectedType === 'NameError') {
      return 'NameError';
    }
    if (stderr.includes('TypeError') || detectedType === 'TypeError') {
      return 'TypeError';
    }
    if (stderr.includes('ValueError') || detectedType === 'ValueError') {
      return 'ValueError';
    }
    if (stderr.includes('IndexError') || stderr.includes('ArrayIndexOutOfBounds') || detectedType === 'IndexError') {
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

    return (detectedType as ErrorCategory) || 'UnknownError';
  }

  private static parsePythonError(stderr: string, code: string): ParsedExecutionError {
    const lines = stderr.trim().split(/\r?\n/);
    const lastLine = lines[lines.length - 1] || '';

    let errorType: ErrorCategory | string = 'RuntimeError';
    let message = lastLine;

    const match = lastLine.match(/^([A-Za-z0-9_]+Error|SyntaxError|IndentationError):\s*(.*)$/);
    if (match) {
      errorType = match[1];
      message = match[2] || match[1];
    } else if (stderr.includes('ZeroDivisionError') || stderr.includes('division by zero')) {
      errorType = 'ZeroDivisionError';
      message = 'division by zero';
    } else if (stderr.includes('NameError')) {
      errorType = 'NameError';
      const nameMatch = stderr.match(/name '([^']+)' is not defined/);
      message = nameMatch ? `name '${nameMatch[1]}' is not defined` : 'name is not defined';
    } else if (stderr.includes('SyntaxError')) {
      errorType = 'SyntaxError';
    }

    // Extract exact line number from Python Traceback:
    // E.g.: File "...", line 4, in <module>
    // E.g.: File "<string>", line 2
    // E.g.: line 3
    let lineNum: number | undefined = undefined;
    const fileMatches = Array.from(stderr.matchAll(/File\s+["'][^"']+["'],\s*line\s+(\d+)/gi));
    if (fileMatches.length > 0) {
      lineNum = parseInt(fileMatches[fileMatches.length - 1][1], 10);
    } else {
      const syntaxLineMatch = stderr.match(/line\s+(\d+)/i);
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
    let errorType = 'RuntimeError';
    let message = lines[0] || 'JavaScript execution failed';

    const match = stderr.match(/([A-Za-z0-9_]+Error):\s*(.*)/);
    if (match) {
      errorType = match[1] === 'ReferenceError' ? 'NameError' : match[1];
      message = match[2];
    }

    let lineNum: number | undefined = undefined;
    let colNum: number | undefined = undefined;

    // Matches `temp.js:4:12` or `at Object.<anonymous> (file.js:5:10)`
    const lineColMatches = Array.from(stderr.matchAll(/(?::|\s|\()(?:\w+\.(?:js|ts|mjs)|<anonymous>):(\d+):(\d+)/gi));
    if (lineColMatches.length > 0) {
      lineNum = parseInt(lineColMatches[0][1], 10);
      colNum = parseInt(lineColMatches[0][2], 10);
    } else {
      const genericLineMatch = stderr.match(/:(\d+):(\d+)/);
      if (genericLineMatch) {
        lineNum = parseInt(genericLineMatch[1], 10);
        colNum = parseInt(genericLineMatch[2], 10);
      }
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
    let errorType = 'CompilationError';
    let message = stderr.trim().split('\n')[0] || 'Java execution failed';
    let lineNum: number | undefined = undefined;

    // javac compiler error: Main.java:4: error: cannot find symbol
    const javaLineMatch = stderr.match(/(?:Main\.java|[^:]+):(\d+):\s*error:\s*(.*)$/m);
    if (javaLineMatch) {
      lineNum = parseInt(javaLineMatch[1], 10);
      message = javaLineMatch[2];
      errorType = 'CompilationError';
    } else {
      // Runtime Exception: Exception in thread "main" java.lang.ArithmeticException: / by zero at Main.main(Main.java:4)
      const exMatch = stderr.match(/Exception in thread "[^"]+"\s+([a-zA-Z0-9_.]+):\s*(.*)/);
      if (exMatch) {
        const rawType = exMatch[1].split('.').pop() || exMatch[1];
        if (rawType === 'ArithmeticException' && exMatch[2].includes('/ by zero')) {
          errorType = 'ZeroDivisionError';
        } else if (rawType === 'ArrayIndexOutOfBoundsException') {
          errorType = 'IndexError';
        } else {
          errorType = rawType;
        }
        message = exMatch[2];
      }

      const runtimeLineMatch = stderr.match(/\((?:Main\.java|[^:]+):(\d+)\)/);
      if (runtimeLineMatch) {
        lineNum = parseInt(runtimeLineMatch[1], 10);
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

    // GCC / Clang / Simulator format: main.c:4:12: error: ...
    const cMatch = stderr.match(/(?:main\.(?:c|cpp|cc)|temp_\w+\.(?:c|cpp)|[^:\s]+):(\d+)(?::(\d+))?:(?:\s*runtime error:|\s*error:|\s*fatal error:)?\s*(.*)/i);
    if (cMatch) {
      lineNum = parseInt(cMatch[1], 10);
      if (cMatch[2]) colNum = parseInt(cMatch[2], 10);
      message = cMatch[3] || message;
    } else {
      const altLineMatch = stderr.match(/line\s+(\d+)/i);
      if (altLineMatch) {
        lineNum = parseInt(altLineMatch[1], 10);
      }
    }

    if (stderr.includes('was not declared in this scope') || stderr.includes('undeclared identifier') || stderr.includes('not defined')) {
      errorType = 'NameError';
    } else if (stderr.includes('division by zero') || stderr.includes('/ 0')) {
      errorType = 'ZeroDivisionError';
    } else if (stderr.includes('expected') || stderr.includes('syntax error') || stderr.includes('unexpected token')) {
      errorType = 'SyntaxError';
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

  /**
   * Code heuristic fallback when compiler stderr doesn't explicitly mention the exact line
   */
  private static detectLineFromCode(code: string, errorType: string, stderr: string, lang: string): number | undefined {
    if (!code) return undefined;
    const lines = code.split(/\r?\n/);

    // 1. ZeroDivisionError: find division by 0
    if (errorType === 'ZeroDivisionError' || stderr.includes('division by zero') || stderr.includes('/ by zero')) {
      for (let i = 0; i < lines.length; i++) {
        if (/\/\s*0(?!\d)/.test(lines[i]) || /%\s*0(?!\d)/.test(lines[i])) {
          return i + 1;
        }
      }
      for (let i = 0; i < lines.length; i++) {
        if (/\/\s*[a-zA-Z_]\w*/.test(lines[i])) {
          return i + 1;
        }
      }
    }

    // 2. NameError: find undefined variable usage
    if (errorType === 'NameError' || stderr.includes('not defined') || stderr.includes('was not declared')) {
      const varMatch = stderr.match(/name '([^']+)' is not defined/) ||
                       stderr.match(/ReferenceError:\s*(\w+)\s*is not defined/) ||
                       stderr.match(/'([^']+)' was not declared/);
      if (varMatch && varMatch[1]) {
        const varName = varMatch[1];
        for (let i = 0; i < lines.length; i++) {
          if (new RegExp(`\\b${varName}\\b`).test(lines[i])) {
            return i + 1;
          }
        }
      }
    }

    // 3. SyntaxError: check brackets, colons, quotes
    if (errorType === 'SyntaxError') {
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i].trim();
        if ((l.startsWith('if ') || l.startsWith('for ') || l.startsWith('while ') || l.startsWith('def ')) && !l.endsWith(':') && (lang === 'python' || lang === 'py')) {
          return i + 1;
        }
      }
    }

    // 4. Missing Input: find input() or cin
    if (errorType === 'MissingInput') {
      for (let i = 0; i < lines.length; i++) {
        if (/input\(|cin\s*>>|Scanner|readLine/.test(lines[i])) {
          return i + 1;
        }
      }
    }

    return 1;
  }

  private static enrichExplanations(parsed: ParsedExecutionError, code: string) {
    const lineNum = parsed.line || 1;
    const snippet = parsed.errorSnippet || `Line ${lineNum}`;

    switch (parsed.errorType) {
      case 'ZeroDivisionError':
        parsed.whatHappened = `Program attempted to divide a number by zero on line ${lineNum}: \`${snippet}\`.`;
        parsed.whyItHappened = `In mathematics and computing, division by zero is undefined and results in an immediate crash.`;
        parsed.howToFix = `Add a safety guard (e.g. \`if divisor != 0:\`) or ensure the divisor is greater than zero before dividing.`;
        break;

      case 'NameError':
        parsed.whatHappened = `Encountered an undefined identifier on line ${lineNum}: \`${snippet}\`.`;
        parsed.whyItHappened = `The variable or function was referenced before it was declared, or has a spelling typo.`;
        parsed.howToFix = `Declare and initialize the variable prior to line ${lineNum} or correct the spelling.`;
        break;

      case 'SyntaxError':
        parsed.whatHappened = `Found invalid syntax on line ${lineNum}: \`${snippet}\`.`;
        parsed.whyItHappened = `The compiler or interpreter encountered unexpected tokens, unclosed quotes, or missing delimiters (colons, semicolons, or braces).`;
        parsed.howToFix = `Check matching parentheses, quotes, and required syntax rules on line ${lineNum}.`;
        break;

      case 'TypeError':
        parsed.whatHappened = `Type mismatch or unsupported operation on line ${lineNum}: \`${snippet}\`.`;
        parsed.whyItHappened = `An operation was attempted on incompatible types (such as adding a string to an integer without casting).`;
        parsed.howToFix = `Explicitly cast values to matching types (e.g. \`int()\`, \`str()\`, or \`String.valueOf()\`).`;
        break;

      case 'IndexError':
        parsed.whatHappened = `Index out of bounds on line ${lineNum}: \`${snippet}\`.`;
        parsed.whyItHappened = `Attempted to access an element at an index that exceeds the length of the list or array.`;
        parsed.howToFix = `Verify the list length with \`len()\` or size checks before indexing, and ensure 0-based indexing limits.`;
        break;

      case 'MissingInput':
        parsed.whatHappened = `Program requires standard interactive input (STDIN).`;
        parsed.whyItHappened = `The program requested input, but no STDIN stream was supplied.`;
        parsed.howToFix = `Provide test input values in the STDIN tab and run with input.`;
        break;

      default:
        parsed.whatHappened = `Execution error on line ${lineNum}: ${parsed.message}`;
        parsed.whyItHappened = `The program crashed with ${parsed.errorType}.`;
        parsed.howToFix = `Review line ${lineNum} and verify variable state and data flow.`;
        break;
    }
  }
}
