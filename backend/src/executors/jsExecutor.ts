import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { BaseExecutor, ExecutionOptions, ExecutionResult } from './baseExecutor';
import { stripAnsi } from '../utils/ansi';

export class JSExecutor implements BaseExecutor {
  async execute(options: ExecutionOptions): Promise<ExecutionResult> {
    const timeoutMs = options.timeoutMs || 5000;
    const maxBufferBytes = 1024 * 1024; // 1024 KB
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codeforge-js-'));
    const filePath = path.join(tempDir, 'main.js');

    fs.writeFileSync(filePath, options.code, 'utf8');

    const startTime = Date.now();

    return new Promise<ExecutionResult>((resolve) => {
      const child = spawn('node', [filePath], { cwd: tempDir });

      let stdout = '';
      let stderr = '';
      let isTimedOut = false;
      let isOutputExceeded = false;

      const timer = setTimeout(() => {
        isTimedOut = true;
        child.kill('SIGKILL');
      }, timeoutMs);

      if (options.input) {
        child.stdin.write(options.input);
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

        try {
          fs.rmSync(tempDir, { recursive: true, force: true });
        } catch {}

        if (isTimedOut) {
          return resolve({
            status: 'timeout',
            stdout,
            stderr: cleanStderr + (cleanStderr ? '\n' : '') + 'Execution timed out (exceeded limit of ' + timeoutMs + 'ms).',
            executionTime,
            exitCode: null
          });
        }

        if (isOutputExceeded) {
          return resolve({
            status: 'output_limit',
            stdout,
            stderr: cleanStderr + (cleanStderr ? '\n' : '') + 'Execution output exceeded 1024 KB buffer limit.',
            executionTime,
            exitCode: code ?? 1
          });
        }

        // Classify JS errors based on exit code
        let status: 'success' | 'syntax_error' | 'runtime_error' | 'error' = 'success';
        if (code !== 0) {
          if (cleanStderr.toLowerCase().includes('syntaxerror')) {
            status = 'syntax_error';
          } else {
            status = 'runtime_error';
          }
        }

        resolve({
          status,
          stdout,
          stderr: cleanStderr,
          executionTime,
          exitCode: code ?? 0
        });
      });

      child.on('error', (err) => {
        clearTimeout(timer);
        try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
        resolve({
          status: 'error',
          stdout: '',
          stderr: `Failed to spawn Node.js runtime: ${err.message}.`,
          executionTime: Date.now() - startTime,
          exitCode: 1
        });
      });
    });
  }
}
