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
              console.error('Error writing to Node.js process stdin:', e);
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
      });

      child.on('close', (code) => {
        clearTimeout(timer);
        const executionTime = Date.now() - startTime;
        const cleanStderr = stripAnsi(stderr);

        let finalStdout = stdout;

        // If batch stdin was provided, format prompt lines with typed input values for readable console output
        if (formattedInput && formattedInput.trim()) {
          const inputLines = formattedInput.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
          if (inputLines.length > 0) {
            let inputIdx = 0;
            const rawLines = finalStdout.split(/\r?\n/);
            const formattedLines: string[] = [];
            let inResultSection = false;

            for (const line of rawLines) {
              const trimmed = line.trim();
              if (trimmed.startsWith('=== RESULT') || trimmed.startsWith('=== SALARY') || trimmed.startsWith('=== OUTPUT') || trimmed.startsWith('Result:')) {
                inResultSection = true;
              }

              const isPrompt = !inResultSection && inputIdx < inputLines.length && (
                /:\s*$/.test(trimmed) || /\?\s*$/.test(trimmed) || />\s*$/.test(trimmed)
              ) && (
                /Enter|input|name|salary|bonus|number|age|value|first|second|third|choose|select/i.test(trimmed) ||
                trimmed.length < 50
              );

              formattedLines.push(line);
              if (isPrompt && inputIdx < inputLines.length) {
                formattedLines.push(`> ${inputLines[inputIdx++]}`);
              }
            }

            finalStdout = formattedLines.join('\n');
            finalStdout = finalStdout.replace(/\n{3,}/g, '\n\n').trim();
          }
        }

        try {
          fs.rmSync(tempDir, { recursive: true, force: true });
        } catch {}

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
          stderr: `Failed to spawn Node.js runtime: ${err.message}.`,
          executionTime: Date.now() - startTime,
          exitCode: 1
        });
      });
    });
  }
}
