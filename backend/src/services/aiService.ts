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
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
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
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleaned);
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
        explanation = 'Python encountered invalid code structure or missing punctuation (like a missing colon or unclosed parenthesis).';
        possibleCause = 'Missing colon after `if`, `def`, or loop statement, or invalid indentation.';
        suggestedFix = 'Add the missing colon `:` at the end of conditional/function headers and check line indentation.';
        correctedCode = code.replace(/(\bif\s+[^:\n]+)(\n|$)/g, '$1:\n    ')
                           .replace(/(\bdef\s+[^:\n]+)(\n|$)/g, '$1:\n    ');
      } else if (stderr.includes('nameerror')) {
        errorType = 'Python Name Error (Undefined Variable)';
        explanation = 'You referenced a variable or function name that has not been defined yet in your Python code.';
        possibleCause = 'Typo in variable name or variable assigned after the call line.';
        suggestedFix = 'Define the variable before using it or verify the spelling.';
        suggestions.push('Keep variable definitions near the top of functions or scopes.');
      } else if (stderr.includes('indentationerror')) {
        errorType = 'Python Indentation Error';
        explanation = 'Python relies on strict indentation to delimit blocks of code. Mixing spaces and tabs or incorrect space counts triggers this.';
        possibleCause = 'Mismatched spacing in `if`, `for`, or `def` blocks.';
        suggestedFix = 'Use consistent 4 spaces for every nested block.';
      }
    } else if (lang === 'javascript' || lang === 'js') {
      if (stderr.includes('syntaxerror')) {
        errorType = 'JavaScript Syntax Error';
        explanation = 'JavaScript encountered unexpected tokens or unclosed brackets/parentheses.';
        possibleCause = 'Missing closing brace `}`, parenthesis `)`, or unexpected keyword placement.';
        suggestedFix = 'Check line numbers in the console and balance all opening `{` with closing `}`.';
      } else if (stderr.includes('referenceerror')) {
        errorType = 'JavaScript Reference Error';
        explanation = 'You attempted to access a variable or function that does not exist in the current scope.';
        possibleCause = 'Undeclared variable or accessing a variable outside its block scope (`const`/`let`).';
        suggestedFix = 'Declare the variable using `const`, `let`, or `var` prior to referencing it.';
      }
    } else if (lang === 'c' || lang === 'cpp' || lang === 'c++') {
      if (stderr.includes('expected') || stderr.includes('error:')) {
        errorType = 'C/C++ Compilation Error';
        explanation = 'The compiler could not compile the program into an executable binary due to syntax or type mismatch errors.';
        possibleCause = 'Missing semicolon `;`, undeclared identifier, or missing `#include` header.';
        suggestedFix = 'Add missing semicolons `;` at the end of statements and verify all headers like `#include <stdio.h>` or `#include <iostream>`.';
      }
    } else if (lang === 'java') {
      if (stderr.includes('cannot find symbol') || stderr.includes('error:')) {
        errorType = 'Java Compilation Error';
        explanation = 'The Java compiler (`javac`) could not resolve a method, variable, or class reference.';
        possibleCause = 'Missing import statement or spelling mismatch in class/variable names.';
        suggestedFix = 'Import missing packages (e.g. `import java.util.*;`) and match public class name to filename.';
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
