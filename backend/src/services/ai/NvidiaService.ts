import { AIDebuggerParams, AIDebuggerResponse } from './AIProvider';

export class NvidiaService {
  /**
   * Primary NVIDIA NIM AI Repair Engine
   */
  static async debugCode(params: AIDebuggerParams): Promise<AIDebuggerResponse> {
    const apiKey = (process.env.NVIDIA_API_KEY || process.env.AI_API_KEY || '').trim();
    const baseUrl = (process.env.NVIDIA_BASE_URL || process.env.AI_BASE_URL || 'https://integrate.api.nvidia.com/v1').replace(/\/$/, '');
    const modelName = process.env.NVIDIA_MODEL || process.env.AI_MODEL || 'meta/llama-3.3-70b-instruct';

    if (!apiKey || apiKey.length === 0) {
      throw new Error('NVIDIA_API_KEY environment variable is missing in backend/.env.');
    }

    const previousAttemptsStr = params.previousAttempts && params.previousAttempts.length > 0
      ? params.previousAttempts.map(p => `Attempt ${p.attempt}: Code Code Length ${p.code.length}, Error: ${p.error || 'Failed'}`).join('\n')
      : 'None';

    const promptText = `You are CodeForge AI Universal Debugger.
Your job is to repair the user's actual program.
Do NOT merely explain the error.
Analyze the ACTUAL execution/compiler error and return a COMPLETE corrected version of the user's source code.

Rules:
1. Preserve the original program's purpose and functionality.
2. Fix the actual error shown by the compiler/runtime.
3. Do not remove working features to hide an error.
4. Do not replace the entire program with a trivial example.
5. Do not invent missing requirements.
6. Preserve valid existing code.
7. Fix syntax errors, runtime errors, type errors, logic errors, and API-related programming errors when possible.
8. Use the exact stderr and exit code as the primary debugging evidence.
9. Pay attention to the exact error line.
10. Return the COMPLETE corrected source file.
11. Never return the original broken code unchanged.
12. Never return Markdown fences.
13. Never return explanations mixed into the source code.
14. The corrected code must be executable.
15. If the program requires STDIN, do not incorrectly modify the program merely because input was not supplied.
16. If the error is caused by missing STDIN, report that it requires input instead of pretending that the program is broken.
17. Make the smallest safe correction necessary.
18. After producing the fix, mentally verify the syntax before returning it.

CURRENT LANGUAGE:
${params.language}

CURRENT SOURCE CODE:
${params.code}

ACTUAL ERROR TYPE:
${params.error?.errorType || 'UnknownError'}

ACTUAL ERROR MESSAGE:
${params.error?.message || 'Execution Error'}

STDERR:
${params.stderr || params.error?.rawStderr || 'None'}

STDOUT:
${params.stdout || 'None'}

EXIT CODE:
${params.exitCode ?? 1}

ERROR LINE:
${params.error?.line || 1}

CURRENT ATTEMPT:
${params.attempt}

PREVIOUS ATTEMPTS:
${previousAttemptsStr}

Return JSON only:
{
  "fixedCode": "COMPLETE CORRECTED SOURCE CODE",
  "rootCause": "short explanation of the actual root cause",
  "explanation": "short explanation of what was fixed"
}`;

    console.log(`[AI-DEBUG] NVIDIA request started for language ${params.language} (Attempt ${params.attempt})...`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            {
              role: 'system',
              content: 'You are CodeForge AI Universal Debugger. You MUST return ONLY JSON matching {"fixedCode": "...", "rootCause": "...", "explanation": "..."}. Never return empty fixedCode. Never return markdown fences.'
            },
            { role: 'user', content: promptText }
          ],
          temperature: 0.1,
          max_tokens: 4096
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`NVIDIA API HTTP ${response.status}: ${errText}`);
      }

      const data: any = await response.json();
      const rawText = data?.choices?.[0]?.message?.content;

      if (!rawText || rawText.trim().length === 0) {
        throw new Error('NVIDIA Build API returned empty response payload.');
      }

      console.log(`[AI-DEBUG] NVIDIA response received. Processing code extraction...`);
      return this.parseResponse(rawText, params);
    } catch (err: any) {
      clearTimeout(timeout);
      console.warn(`[AI-DEBUG] NVIDIA request failed: ${err.message}`);
      throw err;
    }
  }

  private static parseResponse(rawText: string, params: AIDebuggerParams): AIDebuggerResponse {
    let cleanJson = rawText
      .replace(/```json/gi, '')
      .replace(/```python/gi, '')
      .replace(/```/g, '')
      .trim();

    const firstBrace = cleanJson.indexOf('{');
    const lastBrace = cleanJson.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
    }

    try {
      const parsed = JSON.parse(cleanJson);
      let fixedCode = (parsed.fixedCode || parsed.corrected_code || parsed.correctedCode || parsed.code || '').trim();

      // Strip fence if model wrapped code string in backticks
      fixedCode = fixedCode.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();

      if (!fixedCode || fixedCode.length === 0) {
        throw new Error('NVIDIA model returned JSON payload but fixedCode was empty.');
      }

      if (fixedCode === params.code.trim()) {
        console.warn(`[AI-DEBUG] NVIDIA returned identical unchanged code.`);
      } else {
        console.log(`[AI-DEBUG] Fixed code extracted successfully (${fixedCode.length} chars).`);
      }

      return {
        success: true,
        errorType: parsed.errorType || params.error?.errorType || 'SyntaxError',
        errorLine: parsed.errorLine || params.error?.line || 1,
        rootCause: parsed.rootCause || parsed.root_cause || 'Identified error anomaly in source code.',
        explanation: parsed.explanation || 'Applied structural correction to resolve execution error.',
        fixedCode: fixedCode,
        changes: [],
        confidence: 0.98,
        rawResponse: rawText
      };
    } catch (parseErr: any) {
      let directCode = rawText.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
      if (directCode && directCode.length > 0 && directCode !== params.code) {
        console.log(`[AI-DEBUG] Fixed code extracted from raw text (${directCode.length} chars).`);
        return {
          success: true,
          errorType: params.error?.errorType || 'SyntaxError',
          errorLine: params.error?.line || 1,
          rootCause: 'Extracted direct executable code from model output.',
          explanation: 'Extracted raw corrected source code.',
          fixedCode: directCode,
          changes: [],
          confidence: 0.9,
          rawResponse: rawText
        };
      }
      throw new Error(`Failed to parse NVIDIA AI JSON response: ${parseErr.message}`);
    }
  }
}
