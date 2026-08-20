export interface AIDebuggerParams {
  language: string;
  code: string;
  error?: {
    errorType: string;
    message: string;
    line?: number;
    column?: number;
    traceback: string;
    rawStderr: string;
  };
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  attempt: number;
  maxAttempts: number;
  userInput?: string;
  projectFiles?: { path: string; content: string }[];
  previousAttempts?: { attempt: number; code: string; error?: string }[];
}

export interface AIDebuggerResponse {
  success: boolean;
  errorType: string;
  errorLine?: number;
  rootCause: string;
  explanation: string;
  fixedCode: string;
  changes: {
    line?: number;
    before?: string;
    after?: string;
    reason: string;
  }[];
  confidence: number;
  rawResponse?: string;
}

export interface AIProvider {
  name: string;
  debugCode(params: AIDebuggerParams): Promise<AIDebuggerResponse>;
}
