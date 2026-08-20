import { ExecutionOptions, ExecutionResult } from '../executors/baseExecutor';
import { ExecutorFactory } from '../executors/executorFactory';

export interface ParsedError {
  language: string;
  errorType: string;
  message: string;
  line?: number;
  column?: number;
  file?: string;
  stackTrace?: string;
}

export abstract class LanguageAdapter {
  abstract readonly languageId: string;
  abstract readonly extension: string;
  abstract readonly timeoutMs: number;

  abstract compileCommand?(filePath: string): string | null;
  abstract runCommand(filePath: string): string;
  abstract parseError(stderr: string, code: string): ParsedError;

  formatInput(input?: string): string {
    if (!input) return '';
    return input.endsWith('\n') ? input : input + '\n';
  }

  formatOutput(stdout: string): string {
    return stdout ? stdout.trimEnd() : '';
  }

  async execute(options: ExecutionOptions): Promise<ExecutionResult> {
    const executor = ExecutorFactory.getExecutor(this.languageId);
    return executor.execute({
      ...options,
      timeoutMs: options.timeoutMs || this.timeoutMs
    });
  }
}

export class PythonAdapter extends LanguageAdapter {
  readonly languageId = 'python';
  readonly extension = '.py';
  readonly timeoutMs = 5000;

  compileCommand(filePath: string): string | null {
    return `python -m py_compile "${filePath}"`;
  }

  runCommand(filePath: string): string {
    return `python "${filePath}"`;
  }

  parseError(stderr: string, code: string): ParsedError {
    const cleanStderr = stderr ? stderr.trim() : '';

    // Traceback line parser: File "main.py", line X
    const lineMatches = [...cleanStderr.matchAll(/line\s+(\d+)/gi)];
    const line = lineMatches.length > 0 ? parseInt(lineMatches[lineMatches.length - 1][1], 10) : undefined;

    // Error type parser (e.g. `NameError`, `SyntaxError`, `TypeError`, `IndentationError`)
    const typeMatch = cleanStderr.match(/([a-zA-Z0-9_]+Error|[a-zA-Z0-9_]+Exception):\s*(.*)/);
    const errorType = typeMatch ? typeMatch[1] : (cleanStderr.includes('SyntaxError') ? 'SyntaxError' : 'RuntimeError');
    const message = typeMatch ? typeMatch[2] : cleanStderr.split('\n')[0] || 'Python Execution Error';

    return {
      language: 'python',
      errorType,
      message,
      line,
      stackTrace: cleanStderr
    };
  }
}

export class JavaScriptAdapter extends LanguageAdapter {
  readonly languageId = 'javascript';
  readonly extension = '.js';
  readonly timeoutMs = 5000;

  compileCommand(filePath: string): string | null {
    return `node --check "${filePath}"`;
  }

  runCommand(filePath: string): string {
    return `node "${filePath}"`;
  }

  parseError(stderr: string, code: string): ParsedError {
    const cleanStderr = stderr ? stderr.trim() : '';
    const lineMatch = cleanStderr.match(/check\.js:(\d+)|main\.js:(\d+)/i);
    const line = lineMatch ? parseInt(lineMatch[1] || lineMatch[2], 10) : undefined;

    const typeMatch = cleanStderr.match(/([a-zA-Z0-9_]+Error):\s*(.*)/);
    const errorType = typeMatch ? typeMatch[1] : 'JavaScriptError';
    const message = typeMatch ? typeMatch[2] : cleanStderr.split('\n')[0] || 'JavaScript Error';

    return {
      language: 'javascript',
      errorType,
      message,
      line,
      stackTrace: cleanStderr
    };
  }
}

export class TypeScriptAdapter extends LanguageAdapter {
  readonly languageId = 'typescript';
  readonly extension = '.ts';
  readonly timeoutMs = 5000;

  compileCommand(filePath: string): string | null {
    return `npx tsc --noEmit "${filePath}"`;
  }

  runCommand(filePath: string): string {
    return `npx tsx "${filePath}"`;
  }

  parseError(stderr: string, code: string): ParsedError {
    const cleanStderr = stderr ? stderr.trim() : '';
    const lineMatch = cleanStderr.match(/:(\d+):(\d+)/);
    const line = lineMatch ? parseInt(lineMatch[1], 10) : undefined;
    const column = lineMatch ? parseInt(lineMatch[2], 10) : undefined;

    return {
      language: 'typescript',
      errorType: 'TypeError',
      message: cleanStderr.split('\n')[0] || 'TypeScript Error',
      line,
      column,
      stackTrace: cleanStderr
    };
  }
}

export class JavaAdapter extends LanguageAdapter {
  readonly languageId = 'java';
  readonly extension = '.java';
  readonly timeoutMs = 7000;

  compileCommand(filePath: string): string | null {
    return `javac "${filePath}"`;
  }

  runCommand(filePath: string): string {
    return `java Main`;
  }

  parseError(stderr: string, code: string): ParsedError {
    const cleanStderr = stderr ? stderr.trim() : '';
    const lineMatch = cleanStderr.match(/:(\d+):\s*error:/i);
    const line = lineMatch ? parseInt(lineMatch[1], 10) : undefined;

    return {
      language: 'java',
      errorType: 'JavaCompileError',
      message: cleanStderr.split('\n')[0] || 'Java Error',
      line,
      stackTrace: cleanStderr
    };
  }
}

export class CAdapter extends LanguageAdapter {
  readonly languageId = 'c';
  readonly extension = '.c';
  readonly timeoutMs = 5000;

  compileCommand(filePath: string): string | null {
    return `gcc "${filePath}" -o main`;
  }

  runCommand(filePath: string): string {
    return `./main`;
  }

  parseError(stderr: string, code: string): ParsedError {
    const cleanStderr = stderr ? stderr.trim() : '';
    const lineMatch = cleanStderr.match(/:(\d+):(\d+):\s*error:/i);
    const line = lineMatch ? parseInt(lineMatch[1], 10) : undefined;
    const column = lineMatch ? parseInt(lineMatch[2], 10) : undefined;

    return {
      language: 'c',
      errorType: 'CCompileError',
      message: cleanStderr.split('\n')[0] || 'C Error',
      line,
      column,
      stackTrace: cleanStderr
    };
  }
}

export class CppAdapter extends LanguageAdapter {
  readonly languageId = 'cpp';
  readonly extension = '.cpp';
  readonly timeoutMs = 5000;

  compileCommand(filePath: string): string | null {
    return `g++ "${filePath}" -o main`;
  }

  runCommand(filePath: string): string {
    return `./main`;
  }

  parseError(stderr: string, code: string): ParsedError {
    const cleanStderr = stderr ? stderr.trim() : '';
    const lineMatch = cleanStderr.match(/:(\d+):(\d+):\s*error:/i);
    const line = lineMatch ? parseInt(lineMatch[1], 10) : undefined;
    const column = lineMatch ? parseInt(lineMatch[2], 10) : undefined;

    return {
      language: 'cpp',
      errorType: 'CppCompileError',
      message: cleanStderr.split('\n')[0] || 'C++ Error',
      line,
      column,
      stackTrace: cleanStderr
    };
  }
}

export class AdapterFactory {
  private static adapters: Record<string, LanguageAdapter> = {
    python: new PythonAdapter(),
    py: new PythonAdapter(),
    javascript: new JavaScriptAdapter(),
    js: new JavaScriptAdapter(),
    typescript: new TypeScriptAdapter(),
    ts: new TypeScriptAdapter(),
    java: new JavaAdapter(),
    c: new CAdapter(),
    cpp: new CppAdapter(),
    'c++': new CppAdapter()
  };

  static getAdapter(lang: string): LanguageAdapter {
    const normalized = (lang || 'python').toLowerCase().trim();
    return this.adapters[normalized] || this.adapters.python;
  }
}
