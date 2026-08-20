import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { BaseExecutor, ExecutionOptions, ExecutionResult } from './baseExecutor';
import { stripAnsi } from '../utils/ansi';

export class CExecutor implements BaseExecutor {
  async execute(options: ExecutionOptions): Promise<ExecutionResult> {
    const timeoutMs = options.timeoutMs || 5000;
    const maxBufferBytes = 1024 * 1024; // 1024 KB
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codeforge-c-'));
    const sourcePath = path.join(tempDir, 'main.c');
    const exeName = process.platform === 'win32' ? 'main.exe' : 'main.out';
    const exePath = path.join(tempDir, exeName);

    fs.writeFileSync(sourcePath, options.code, 'utf8');
    const startTime = Date.now();

    // 1. Compilation Phase using GCC
    try {
      execSync(`gcc "${sourcePath}" -o "${exePath}"`, { cwd: tempDir, timeout: 10000, stdio: 'pipe' });
    } catch (compileErr: any) {
      const rawStderr = compileErr.stderr ? compileErr.stderr.toString() : compileErr.message;
      const cleanStderr = stripAnsi(rawStderr);
      try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
      return {
        status: 'compilation_error',
        stdout: '',
        stderr: cleanStderr || 'C Compilation Failed.',
        executionTime: Date.now() - startTime,
        exitCode: 1
      };
    }

    // 2. Execution Phase
    return new Promise<ExecutionResult>((resolve) => {
      const child = spawn(exePath, [], { cwd: tempDir });

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
              console.error('Error writing to C process stdin:', e);
            }
          }
        });
      }

      const timer = setTimeout(() => {
        isTimedOut = true;
        child.kill('SIGKILL');
      }, timeoutMs);

      let formattedInput = options.input || '';
      if (formattedInput) {
        if (!formattedInput.endsWith('\n')) {
          formattedInput += '\n';
        }
        child.stdin.write(formattedInput);
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

        let finalStdout = stdout;

        if (formattedInput && formattedInput.trim()) {
          const inputLines = formattedInput.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
          if (inputLines.length > 0) {
            let inputIdx = 0;
            finalStdout = finalStdout.replace(/([A-Z][a-zA-Z0-9\s]*:\s*)/g, (match) => {
              if (inputIdx < inputLines.length) {
                const typed = inputLines[inputIdx++];
                return `\n${match.trimEnd()}\n> ${typed}\n`;
              }
              return match;
            });
            finalStdout = finalStdout.replace(/\n{3,}/g, '\n\n').trim();
          }
        }

        try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}

        if (isStopped) {
          return resolve({
            status: 'stopped',
            stdout: finalStdout,
            stderr: cleanStderr + (cleanStderr ? '\n' : '') + 'Execution stopped by user.',
            executionTime,
            exitCode: null
          });
        }

        if (isTimedOut) {
          return resolve({
            status: 'timeout',
            stdout: finalStdout,
            stderr: cleanStderr + (cleanStderr ? '\n' : '') + 'Execution timed out (exceeded limit of ' + timeoutMs + 'ms).',
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

        resolve({
          status: code === 0 ? 'success' : 'runtime_error',
          stdout: finalStdout,
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
          stderr: `Execution failure: ${err.message}`,
          executionTime: Date.now() - startTime,
          exitCode: 1
        });
      });
    });
  }
}
