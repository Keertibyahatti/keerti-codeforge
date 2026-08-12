# CodeForge AI — AI Module Specification

The AI Module in CodeForge AI provides automated syntax analysis, beginner-friendly error explanations, code fix generation, and code optimization.

## Provider Architecture
1. **Primary Remote Provider**: Google Gemini API (`gemini-2.5-flash` model) configured via `AI_API_KEY` in environment variables.
2. **Fallback Diagnostic Engine**: When `AI_API_KEY` is omitted or remote API service is unreachable, CodeForge AI automatically activates its internal structured rule engine to parse errors (tracebacks, syntax errors, name errors, compiler output) and generate beginner-friendly explanations and fixes without failing.

## Output Schema
All AI analysis requests return structured JSON:
```json
{
  "summary": "Short 1-sentence summary",
  "errorType": "Python Syntax Error",
  "explanation": "Beginner friendly explanation of what went wrong",
  "possibleCause": "Root cause explanation",
  "suggestedFix": "Step by step fix guide",
  "correctedCode": "Complete working corrected code block",
  "optimizationSuggestions": [
    "Check variable names and function signatures.",
    "Verify all closing brackets match."
  ]
}
```
