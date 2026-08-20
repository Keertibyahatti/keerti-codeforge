export interface ProcessSpawnHandle {
  killFn: () => void;
  writeStdin: (data: string) => void;
}

export interface ExecutionOptions {
  code: string;
  input?: string;
  timeoutMs?: number; // Default 5000ms
  onChildSpawn?: (handle: ProcessSpawnHandle) => void;
}

export interface ExecutionResult {
  status: 'success' | 'error' | 'syntax_error' | 'runtime_error' | 'timeout' | 'compilation_error' | 'output_limit' | 'stopped';
  stdout: string;
  stderr: string;
  executionTime: number; // in ms
  exitCode: number | null;
  errorLine?: number;
  errorColumn?: number;
  missingSymbol?: string;
  missingOperand?: string;
  wrongSymbol?: string;
  suggestedFixSymbol?: string;
  errorSnippet?: string;
}

export interface BaseExecutor {
  execute(options: ExecutionOptions): Promise<ExecutionResult>;
}
