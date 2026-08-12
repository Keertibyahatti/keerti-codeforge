import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { BaseExecutor, ExecutionOptions, ExecutionResult } from './baseExecutor';
import { stripAnsi } from '../utils/ansi';

export class PythonExecutor implements BaseExecutor {
  async execute(options: ExecutionOptions): Promise<ExecutionResult> {
    const timeoutMs = options.timeoutMs || 5000;
    const maxBufferBytes = 1024 * 1024; // 1024 KB
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codeforge-py-'));
    const filePath = path.join(tempDir, 'main.py');

    fs.writeFileSync(filePath, options.code, 'utf8');

    const startTime = Date.now();

    return new Promise<ExecutionResult>((resolve) => {
      // Spawn Python process with unbuffered environment
      const child = spawn('python', [filePath], {
        cwd: tempDir,
        env: { ...process.env, PYTHONUNBUFFERED: '1' }
      });

      let stdout = '';
      let stderr = '';
      let isTimedOut = false;
      let isOutputExceeded = false;

      const timer = setTimeout(() => {
        isTimedOut = true;
        child.kill('SIGKILL');
      }, timeoutMs);

      // Ensure stdin stream ends with a newline so input() finishes reading line
      let formattedInput = options.input || '';
      if (formattedInput && !formattedInput.endsWith('\n')) {
        formattedInput += '\n';
      }

      if (formattedInput) {
        child.stdin.write(formattedInput);
        child.stdin.end();
      } else {
        child.stdin.end();
      }

      child.stdout.on('data', (data) => {
        stdout += data.toString();
        if (stdout.length > maxBufferBytes) {
          isOutputExceeded = true;
          stdout = stdout.substring(0, maxBufferBytes) + '\n... [Output Limit Exceeded (1024 KB)]';
          child.kill('SIGKILL');
        }
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        clearTimeout(timer);
        const executionTime = Date.now() - startTime;
        const cleanStderr = stripAnsi(stderr);

        // Format prompt text in stdout if input was provided (e.g. "Enter a number: " -> "Enter a number: 1\n")
        let finalStdout = stdout;
        if (options.input && options.input.trim().length > 0 && finalStdout.includes(':')) {
          const firstInputLine = options.input.trim().split('\n')[0];
          finalStdout = finalStdout.replace(/([a-zA-Z0-9_\s]+:\s*)(?=[^\r\n0-9]*[a-zA-Z0-9])/g, `$1${firstInputLine}\n`);
        }

        // Clean up temporary execution directory
        try {
          fs.rmSync(tempDir, { recursive: true, force: true });
        } catch {}

        if (isTimedOut) {
          return resolve({
            status: 'timeout',
            stdout: finalStdout,
            stderr: cleanStderr + (cleanStderr ? '\n' : '') + 'Execution timed out (exceeded process limit of ' + timeoutMs + 'ms).',
            executionTime,
            exitCode: null
          });
        }

        if (isOutputExceeded) {
          return resolve({
            status: 'output_limit',
            stdout: finalStdout,
            stderr: cleanStderr + (cleanStderr ? '\n' : '') + 'Execution output exceeded 1024 KB buffer limit.',
            executionTime,
            exitCode: code ?? 1
          });
        }

        // Determine status cleanly based primarily on exit code
        let status: 'success' | 'syntax_error' | 'runtime_error' | 'error' = 'success';
        let errorLine: number | undefined;
        let errorColumn: number | undefined;
        let missingSymbol: string | undefined;
        let missingOperand: string | undefined;
        let wrongSymbol: string | undefined;
        let suggestedFixSymbol: string | undefined;
        let errorSnippet: string | undefined;

        if (code !== 0) {
          const lowerStderr = cleanStderr.toLowerCase();
          if (lowerStderr.includes('syntaxerror') || lowerStderr.includes('indentationerror') || lowerStderr.includes('taberror')) {
            status = 'syntax_error';
          } else {
            status = 'runtime_error';
          }

          // Parse line number from Python Traceback (e.g., line 5)
          const lineMatch = cleanStderr.match(/line\s+(\d+)/i);
          if (lineMatch) {
            errorLine = parseInt(lineMatch[1], 10);
            const lines = options.code.split('\n');
            if (errorLine && errorLine <= lines.length) {
              errorSnippet = lines[errorLine - 1].trim();
            }
          }

          // Parse TypeError signature mismatch (e.g. TypeError: calculate_factorial() takes 0 positional arguments but 1 was given)
          const typeErrorMatch = cleanStderr.match(/TypeError:\s*([A-Za-z0-9_]+)\(\)\s*takes\s*0\s*positional\s*arguments\s*but\s*1\s*was\s*given/i);
          if (typeErrorMatch) {
            const funcName = typeErrorMatch[1];
            wrongSymbol = `def ${funcName}()`;
            suggestedFixSymbol = `def ${funcName}(n)`;
          }

          // Parse NameError (e.g. NameError: name 'nu' is not defined)
          if (!wrongSymbol) {
            const nameErrorMatch = cleanStderr.match(/NameError:\s*name\s*['"]([^'"]+)['"]\s*is not defined/i);
            if (nameErrorMatch) {
              wrongSymbol = nameErrorMatch[1];
            }
          }

          // Inspect incomplete arithmetic expressions (e.g., n - without operand)
          if (errorSnippet) {
            const trailingOperatorMatch = errorSnippet.match(/([+\-*/%])\s*$/);
            if (trailingOperatorMatch) {
              missingOperand = '1';
              if (!wrongSymbol) wrongSymbol = trailingOperatorMatch[1];
            }
          }

          // Parse suggested fixes (e.g., Maybe you meant '==' or ':=' instead of '='?)
          const equalityMatch = cleanStderr.match(/Maybe you meant ['"]([^'"]+)['"].*instead of ['"]([^'"]+)['"]/i);
          if (equalityMatch) {
            suggestedFixSymbol = equalityMatch[1];
            wrongSymbol = equalityMatch[2];
          } else if (cleanStderr.includes("'='") && (cleanStderr.includes("invalid syntax") || cleanStderr.includes("cannot assign"))) {
            wrongSymbol = '=';
            suggestedFixSymbol = '==';
          }

          // Parse missing closing bracket symbols
          if (cleanStderr.includes("'(' was never closed")) {
            missingSymbol = ')';
            if (missingOperand) {
              suggestedFixSymbol = ' 1)';
            }
          } else if (cleanStderr.includes("'[' was never closed")) {
            missingSymbol = ']';
          } else if (cleanStderr.includes("'{' was never closed")) {
            missingSymbol = '}';
          } else if (cleanStderr.includes('expected \':\'')) {
            missingSymbol = ':';
            wrongSymbol = '';
            suggestedFixSymbol = ':';
          } else if (cleanStderr.includes('unclosed string literal')) {
            missingSymbol = '"';
          }
        }

        resolve({
          status,
          stdout: finalStdout,
          stderr: cleanStderr,
          executionTime,
          exitCode: code ?? 0,
          errorLine,
          errorColumn,
          missingSymbol,
          missingOperand,
          wrongSymbol,
          suggestedFixSymbol,
          errorSnippet
        });
      });

      child.on('error', (err) => {
        clearTimeout(timer);
        try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
        resolve({
          status: 'error',
          stdout: '',
          stderr: `Failed to spawn Python 3 interpreter: ${err.message}. Ensure python is installed and in PATH.`,
          executionTime: Date.now() - startTime,
          exitCode: 1
        });
      });
    });
  }
}
