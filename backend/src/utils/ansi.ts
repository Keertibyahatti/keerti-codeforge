/**
 * Helper to strip ANSI color and formatting escape codes from string outputs
 */
export function stripAnsi(text: string): string {
  if (!text) return '';
  return text.replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, '');
}
