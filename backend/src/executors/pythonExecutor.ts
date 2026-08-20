import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { BaseExecutor, ExecutionOptions, ExecutionResult } from './baseExecutor';
import { stripAnsi } from '../utils/ansi';

export class PythonExecutor implements BaseExecutor {
  /**
   * Native Python Syntax Validator using py_compile.
   * Guarantees 100% accurate Python syntax verification without generic bracket-counting rules.
   */
  static validateSyntax(code: string): { valid: boolean; error?: string; line?: number } {
    if (!code || !code.trim()) return { valid: false, error: 'Empty code' };
    
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codeforge-pyval-'));
    const filePath = path.join(tempDir, 'check.py');
    fs.writeFileSync(filePath, code, 'utf8');

    const env = { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1' };

    try {
      try {
        execSync(`python -m py_compile "${filePath}"`, { stdio: 'pipe', env });
      } catch (cmdErr: any) {
        if (cmdErr.stderr && cmdErr.stderr.toString().includes('SyntaxError')) {
          throw cmdErr;
        }
        execSync(`py -m py_compile "${filePath}"`, { stdio: 'pipe', env });
      }
      fs.rmSync(tempDir, { recursive: true, force: true });
      return { valid: true };
    } catch (err: any) {
      const cleanStderr = stripAnsi(err.stderr ? err.stderr.toString() : err.message || '');
      const lineMatches = [...cleanStderr.matchAll(/line\s+(\d+)/gi)];
      const line = lineMatches.length > 0 ? parseInt(lineMatches[lineMatches.length - 1][1], 10) : undefined;
      fs.rmSync(tempDir, { recursive: true, force: true });
      return { valid: false, error: cleanStderr, line };
    }
  }

  async execute(options: ExecutionOptions): Promise<ExecutionResult> {
    const timeoutMs = options.timeoutMs || 5000;
    const maxBufferBytes = 1024 * 1024; // 1024 KB
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codeforge-py-'));
    const filePath = path.join(tempDir, 'main.py');

    fs.writeFileSync(filePath, options.code, 'utf8');

    const startTime = Date.now();

    return new Promise<ExecutionResult>((resolve) => {
      // Spawn Python process with unbuffered UTF-8 environment
      const child = spawn('python', [filePath], {
        cwd: tempDir,
        env: {
          ...process.env,
          PYTHONUNBUFFERED: '1',
          PYTHONIOENCODING: 'utf-8',
          PYTHONUTF8: '1'
        }
      });

      let stdout = '';
      let stderr = '';
      let isTimedOut = false;
      let isStopped = false;
      let isOutputExceeded = false;

      if (options.onChildSpawn) {
        options.onChildSpawn({
          killFn: () => {
            isStopped = true;
            try { child.kill('SIGKILL'); } catch {}
          },
          writeStdin: (data: string) => {
            try {
              const text = data.endsWith('\n') ? data : data + '\n';
              child.stdin.write(text);
            } catch (e) {
              console.error('Error writing to Python process stdin:', e);
            }
          }
        });
      }

      const timer = setTimeout(() => {
        isTimedOut = true;
        child.kill('SIGKILL');
      }, timeoutMs);

      // Pass input to child process stdin if provided
      let formattedInput = options.input || '';
      if (formattedInput) {
        if (!formattedInput.endsWith('\n')) {
          formattedInput += '\n';
        }
        child.stdin.write(formattedInput);
      }
      child.stdin.end();

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
        if (stderr.length > maxBufferBytes) {
          isOutputExceeded = true;
          stderr = stderr.substring(0, maxBufferBytes) + '\n... [Output Limit Exceeded (1024 KB)]';
          child.kill('SIGKILL');
        }
      });

      child.on('close', (code) => {
        clearTimeout(timer);
        const executionTime = Date.now() - startTime;
        fs.rmSync(tempDir, { recursive: true, force: true });

        const cleanStdout = stripAnsi(stdout);
        const cleanStderr = stripAnsi(stderr);

        if (isStopped) {
          return resolve({
            status: 'stopped',
            stdout: cleanStdout,
            stderr: cleanStderr || 'Execution stopped by user.',
            executionTime,
            exitCode: null
          });
        }

        if (isTimedOut) {
          return resolve({
            status: 'timeout',
            stdout: cleanStdout,
            stderr: `Execution timed out (exceeded process limit of ${timeoutMs}ms).`,
            executionTime,
            exitCode: null
          });
        }

        if (isOutputExceeded) {
          return resolve({
            status: 'runtime_error',
            stdout: cleanStdout,
            stderr: 'Execution stopped: Output size limit exceeded.',
            executionTime,
            exitCode: 1
          });
        }

        if (code === 0) {
          return resolve({
            status: 'success',
            stdout: cleanStdout,
            stderr: cleanStderr,
            executionTime,
            exitCode: 0
          });
        } else {
          return resolve({
            status: 'runtime_error',
            stdout: cleanStdout,
            stderr: cleanStderr || `Process exited with error code ${code}`,
            executionTime,
            exitCode: code ?? 1
          });
        }
      });

      child.on('error', (err) => {
        clearTimeout(timer);
        const executionTime = Date.now() - startTime;
        fs.rmSync(tempDir, { recursive: true, force: true });

        resolve({
          status: 'compilation_error',
          stdout: '',
          stderr: `Failed to start Python execution process: ${err.message}`,
          executionTime,
          exitCode: 1
        });
      });
    });
  }
}
