/**
 * Syntax validation helper to prevent applying truncated or broken code snippets.
 */
export function isCodeValidSyntax(code: string): boolean {
  if (!code || !code.trim()) return false;

  let parens = 0;
  let brackets = 0;
  let braces = 0;
  let inString: string | null = null;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const prevChar = i > 0 ? code[i - 1] : '';

    if (inString) {
      if (char === inString && prevChar !== '\\') {
        inString = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = char;
      continue;
    }

    if (char === '(') parens++;
    else if (char === ')') parens--;
    else if (char === '[') brackets++;
    else if (char === ']') brackets--;
    else if (char === '{') braces++;
    else if (char === '}') braces--;

    if (parens < 0 || brackets < 0 || braces < 0) return false;
  }

  // Ensure all delimiters are closed and strings are terminated
  if (parens !== 0 || brackets !== 0 || braces !== 0 || inString !== null) return false;

  // Ensure the last line doesn't end abruptly with a trailing binary operator (e.g. "n -")
  const lines = code.trim().split('\n');
  const lastLine = lines[lines.length - 1].trim();
  if (/([+\-*/%&=|<,])\s*$/.test(lastLine) && !lastLine.endsWith(':')) {
    return false;
  }

  return true;
}
