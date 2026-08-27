import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { PythonExecutor } from '../../executors/pythonExecutor';
import { ExecutorFactory } from '../../executors/executorFactory';

export interface CodeValidationResult {
  valid: boolean;
  code: string;
  error?: string;
  reason?: string;
}

export class CodeValidator {
  /**
   * Cleans markdown fences, backticks, and extra whitespace from code blocks.
   */
  static cleanCodeBlock(rawCode: string): string {
    if (!rawCode) return '';
    let cleaned = rawCode.trim();

    // 1. Remove json wrapper if AI wrapped code inside JSON string
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
      try {
        const parsed = JSON.parse(cleaned);
        if (parsed.fixedCode) {
          cleaned = parsed.fixedCode;
        }
      } catch {}
    }

    // 2. Remove language fenced blocks (```python ... ```, ```javascript ... ```, etc.)
    cleaned = cleaned.replace(/^```[a-zA-Z0-9_+\-]*\n?/i, '').replace(/\n?```$/i, '').trim();

    // 3. Remove leading/trailing stray quotes if enclosed
    if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
      if (cleaned.includes('\n')) {
        cleaned = cleaned.substring(1, cleaned.length - 1);
      }
    }

    return cleaned;
  }

  static validate(candidateCode: string, language: string): CodeValidationResult {
    const cleanedCode = this.cleanCodeBlock(candidateCode);

    if (!cleanedCode || cleanedCode.trim().length === 0) {
      return {
        valid: false,
        code: candidateCode,
        error: 'AI_FIX_INVALID',
        reason: 'Candidate fix returned empty or null source code string.'
      };
    }

    const lang = (language || 'python').toLowerCase();

    // 1. Python Validation
    if (lang === 'python' || lang === 'py') {
      const pyVal = PythonExecutor.validateSyntax(cleanedCode);
      if (!pyVal.valid) {
        return {
          valid: false,
          code: cleanedCode,
          error: pyVal.error || 'Python SyntaxError',
          reason: 'Compiler check (py_compile) detected invalid syntax.'
        };
      }
    }

    // 2. JavaScript / TypeScript Validation (node --check)
    if (lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts') {
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codeforge-val-js-'));
      const fileExt = (lang.includes('ts')) ? 'ts' : 'js';
      const tmpFile = path.join(tmpDir, `check.${fileExt}`);
      try {
        fs.writeFileSync(tmpFile, cleanedCode, 'utf8');
        execSync(`node --check "${tmpFile}"`, { stdio: 'pipe' });
      } catch (err: any) {
        const stderr = err.stderr ? err.stderr.toString('utf8') : err.message;
        return {
          valid: false,
          code: cleanedCode,
          error: stderr || 'JavaScript/TypeScript SyntaxError',
          reason: 'Compiler check (node --check) detected invalid syntax.'
        };
      } finally {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      }
    }

    // 3. C / C++ Syntax Check (gcc / g++ -fsyntax-only or Static AST validator)
    if (lang === 'c' || lang === 'cpp' || lang === 'c++') {
      const isCpp = lang.includes('c++') || lang === 'cpp';
      const compiler = isCpp ? 'g++' : 'gcc';
      const ext = isCpp ? 'cpp' : 'c';
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codeforge-val-c-'));
      const tmpFile = path.join(tmpDir, `check.${ext}`);
      try {
        fs.writeFileSync(tmpFile, cleanedCode, 'utf8');
        execSync(`${compiler} -fsyntax-only "${tmpFile}"`, { stdio: 'pipe' });
      } catch (err: any) {
        if (err.stderr) {
          const stderr = err.stderr.toString('utf8');
          if (!stderr.includes('not recognized') && !stderr.includes('not found') && !stderr.includes('ENOENT')) {
            return {
              valid: false,
              code: cleanedCode,
              error: stderr,
              reason: `${compiler} syntax check detected errors.`
            };
          }
        }
      } finally {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      }

      // Check missing main()
      if (!/int\s+main\s*\(/.test(cleanedCode) && !/void\s+main\s*\(/.test(cleanedCode) && !/main\s*\(/.test(cleanedCode)) {
        return {
          valid: false,
          code: cleanedCode,
          error: `main.${ext}: error: undefined reference to 'main'`,
          reason: 'Missing main function declaration.'
        };
      }
    }

    return {
      valid: true,
      code: cleanedCode
    };
  }

  static async validateAndCheckExecution(candidateCode: string, language: string, userInput?: string): Promise<{ valid: boolean; exitCode?: number; stdout?: string; stderr?: string }> {
    const syntaxCheck = this.validate(candidateCode, language);
    if (!syntaxCheck.valid) {
      return { valid: false, stderr: syntaxCheck.error };
    }

    try {
      const executor = ExecutorFactory.getExecutor(language);
      const res = await executor.execute({
        code: syntaxCheck.code,
        input: userInput || ''
      });

      return {
        valid: res.status === 'success' && res.exitCode === 0,
        exitCode: res.exitCode ?? undefined,
        stdout: res.stdout,
        stderr: res.stderr
      };
    } catch (err: any) {
      return {
        valid: false,
        stderr: err.message
      };
    }
  }
}
