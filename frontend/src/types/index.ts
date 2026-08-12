export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Program {
  id: string;
  userId: string;
  title: string;
  language: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  versions?: CodeVersion[];
  executions?: Execution[];
  _count?: {
    versions: number;
    executions: number;
  };
}

export interface CodeVersion {
  id: string;
  programId: string;
  code: string;
  language: string;
  createdAt: string;
}

export type ExecutionStatus = 'success' | 'syntax_error' | 'runtime_error' | 'compilation_error' | 'timeout' | 'output_limit' | 'stopped' | 'error';

export interface Execution {
  id: string;
  userId?: string;
  programId?: string;
  language: string;
  code: string;
  input?: string;
  status: ExecutionStatus;
  stdout?: string;
  stderr?: string;
  executionTime: number;
  exitCode: number;
  createdAt: string;
  program?: {
    id: string;
    title: string;
  };
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
