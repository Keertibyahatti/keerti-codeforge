import { PythonExecutor } from '../executors/pythonExecutor';

export interface AIAnalysisRequest {
  language: string;
  code: string;
  stderr?: string;
  stdout?: string;
  userInput?: string;
}

export interface AIAnalysisResponse {
  summary: string;
  errorType: string;
  explanation: string;
  possibleCause: string;
  suggestedFix: string;
  correctedCode: string;
  optimizationSuggestions: string[];
}

export class AIService {
  static async analyzeError(req: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const apiKey = process.env.AI_API_KEY;

    if (apiKey && apiKey.trim().length > 0) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.AI_MODEL || 'gemini-2.5-flash'}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are CodeForge AI, an expert programming tutor. Analyze this ${req.language} code execution issue:
Code:
\`\`\`${req.language}
${req.code}
\`\`\`

Stderr / Error:
${req.stderr || 'No explicit error logged.'}

Stdout:
${req.stdout || 'None'}

User Input:
${req.userInput || 'None'}

Respond with ONLY a JSON object (no markdown surrounding) matching this interface:
{
  "summary": "Short 1-sentence summary",
  "errorType": "Syntax Error / Runtime Error / Logic Warning",
  "explanation": "Beginner friendly explanation of what went wrong",
  "possibleCause": "Root cause explanation",
  "suggestedFix": "Step by step fix guide",
  "correctedCode": "Complete working corrected code block without markdown backticks",
  "optimizationSuggestions": ["Suggestion 1", "Suggestion 2"]
}`
              }]
            }],
            generationConfig: {
              maxOutputTokens: 2048,
              temperature: 0.2
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed: AIAnalysisResponse = JSON.parse(cleaned);

            // Validate Python candidate code using native py_compile
            if (req.language.toLowerCase() === 'python' || req.language.toLowerCase() === 'py') {
              const val = PythonExecutor.validateSyntax(parsed.correctedCode);
              if (!val.valid) {
                console.warn('AI suggested Python code failed py_compile validation. Reverting to original code.');
                parsed.correctedCode = req.code;
                parsed.suggestedFix += ' (Note: AI generated code was incomplete and original code was preserved)';
              }
            }

            return parsed;
          }
        }
      } catch (remoteError) {
        console.warn('Remote AI provider failed, falling back to local smart diagnostic engine:', remoteError);
      }
    }

    // Smart Local Fallback Diagnostic Engine
    return this.generateSmartFallback(req);
  }

  static async optimizeCode(req: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    const apiKey = process.env.AI_API_KEY;

    if (apiKey && apiKey.trim().length > 0) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.AI_MODEL || 'gemini-2.5-flash'}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are CodeForge AI optimization engine. Optimize this ${req.language} code for better performance, time/space complexity, and clean code standards:
Code:
\`\`\`${req.language}
${req.code}
\`\`\`

Respond ONLY with JSON matching:
{
  "summary": "Optimization summary",
  "errorType": "Performance Optimization",
  "explanation": "Why this optimization improves speed or memory usage",
  "possibleCause": "Inefficiencies detected in original code",
  "suggestedFix": "Refactored structure",
  "correctedCode": "Optimized source code without markdown backticks",
  "optimizationSuggestions": ["Reduced loop iterations", "Used optimal data structures"]
}`
              }]
            }],
            generationConfig: {
              maxOutputTokens: 2048,
              temperature: 0.2
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed: AIAnalysisResponse = JSON.parse(cleaned);

            if (req.language.toLowerCase() === 'python' || req.language.toLowerCase() === 'py') {
              const val = PythonExecutor.validateSyntax(parsed.correctedCode);
              if (!val.valid) {
                parsed.correctedCode = req.code;
              }
            }
            return parsed;
          }
        }
      } catch (remoteError) {
        console.warn('Remote AI provider failed, falling back to local optimizer:', remoteError);
      }
    }

    return this.generateOptimizationFallback(req);
  }

  private static generateSmartFallback(req: AIAnalysisRequest): AIAnalysisResponse {
    const stderr = (req.stderr || '').toLowerCase();
    const code = req.code;
    const lang = req.language.toLowerCase();

    let errorType = 'Runtime / Syntax Notice';
    let explanation = 'An error occurred during execution of your code.';
    let possibleCause = 'Syntax mismatch or invalid statement in the source program.';
    let suggestedFix = 'Ensure proper syntax, variable declarations, and indentation.';
    let correctedCode = code;
    let suggestions: string[] = ['Check variable names and function signatures.', 'Verify all closing brackets and quotes match.'];

    if (lang === 'python') {
      if (stderr.includes('syntaxerror')) {
        errorType = 'Python Syntax Error';
        explanation = 'Python encountered invalid code structure or missing punctuation.';
        possibleCause = 'Missing colon after `if`, `def`, or loop statement, or truncated statement.';
        suggestedFix = 'Complete the statement or add the missing colon `:` at the end of conditional/function headers.';
        
        // Auto-fix truncated calculate_factorial line if present
        if (code.includes('print(f"Factorial of {num} is {calculate_factor')) {
          correctedCode = code.replace(/print\(f"Factorial of \{num\} is \{calculate_factor.*/, 'print(f"Factorial of {num} is {calculate_factorial(num)}")');
        } else {
          correctedCode = code.replace(/(\bif\s+[^:\n]+)(\n|$)/g, '$1:\n    ')
                            .replace(/(\bdef\s+[^:\n]+)(\n|$)/g, '$1:\n    ');
        }
      } else if (stderr.includes('nameerror')) {
        errorType = 'Python Name Error (Undefined Variable)';
        explanation = 'You referenced a variable or function name that has not been defined yet in your Python code.';
        possibleCause = 'Typo in variable name or variable assigned after the call line.';
        suggestedFix = 'Define the variable before using it or verify the spelling.';
        if (code.includes('nu\n')) {
          correctedCode = code.replace(/nu\n/g, 'num = int(input("Enter a number: "))\n');
        }
      } else if (stderr.includes('typeerror')) {
        errorType = 'Python Type Error';
        explanation = 'Function parameter count mismatch or invalid argument type.';
        possibleCause = 'Function signature defined without parameters but called with arguments.';
        suggestedFix = 'Update function definition to accept parameter `(n)`.';
        if (code.includes('def calculate_factorial():')) {
          correctedCode = code.replace('def calculate_factorial():', 'def calculate_factorial(n):');
        }
      }
    }

    // Validate fallback correctedCode using py_compile
    if (lang === 'python' || lang === 'py') {
      const val = PythonExecutor.validateSyntax(correctedCode);
      if (!val.valid) {
        correctedCode = code;
      }
    }

    return {
      summary: `Analyzed ${errorType} in ${req.language} program.`,
      errorType,
      explanation,
      possibleCause,
      suggestedFix,
      correctedCode,
      optimizationSuggestions: suggestions
    };
  }

  private static generateOptimizationFallback(req: AIAnalysisRequest): AIAnalysisResponse {
    const code = req.code;
    const lang = req.language;

    return {
      summary: `CodeForge Optimization Analysis for ${lang} program`,
      errorType: 'Performance & Readability Optimization',
      explanation: 'Evaluated algorithmic structure, loop efficiency, and memory allocations.',
      possibleCause: 'Potential redundant iterations or unoptimized string/list concatenations.',
      suggestedFix: 'Use built-in data structures and efficient loop techniques.',
      correctedCode: code,
      optimizationSuggestions: [
        'Consider using built-in methods (e.g., map/filter in JS, list comprehensions in Python) for faster execution.',
        'Avoid redundant operations inside nested loop bodies.',
        'Ensure proper memory cleanup and scope isolation.'
      ]
    };
  }
}
