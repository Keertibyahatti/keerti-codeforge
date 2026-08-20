import { AIDebuggerParams } from '../AIProvider';

export function buildDebuggerPrompt(params: AIDebuggerParams): string {
  const previousAttemptsContext = params.previousAttempts && params.previousAttempts.length > 0
    ? params.previousAttempts.map(p => `--- ATTEMPT ${p.attempt} CODE ---\n${p.code}\n--- ATTEMPT ${p.attempt} ERROR ---\n${p.error || 'Execution failed'}`).join('\n\n')
    : 'None';

  return `You are CodeForge AI Universal Debugger.

You must repair the user's CURRENT PROGRAM.

Programming language:
${params.language}

CURRENT COMPLETE SOURCE CODE:
${params.code}

ACTUAL EXECUTION ERROR:
${params.error?.errorType || 'Error'}: ${params.error?.message || 'Execution failed'} (Line ${params.error?.line ?? 'Unknown'})

STDOUT:
${params.stdout || 'None'}

STDERR:
${params.stderr || params.error?.rawStderr || 'None'}

EXIT CODE:
${params.exitCode ?? 1}

ATTEMPT:
${params.attempt}

PREVIOUS ATTEMPTS:
${previousAttemptsContext}

Instructions:

1. Analyze the actual source code.
2. Analyze the actual execution error.
3. Identify the root cause.
4. Fix the actual user's program.
5. Preserve the original purpose and functionality.
6. Do not replace the program with an example.
7. Do not invent unrelated functions.
8. Do not remove functionality merely to hide the error.
9. Return the COMPLETE corrected source code.
10. The corrected source must be executable.
11. If the previous AI fix failed, analyze the new error.
12. Return JSON only.

Required response:

{
  "fixedCode": "COMPLETE CORRECTED SOURCE CODE",
  "rootCause": "ACTUAL ROOT CAUSE",
  "explanation": "BEGINNER FRIENDLY EXPLANATION",
  "changes": [],
  "confidence": 0.95
}`;
}
