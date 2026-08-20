import { AIProvider, AIDebuggerParams, AIDebuggerResponse } from './AIProvider';
import { OllamaService } from '../ollamaService';

export class OllamaProvider implements AIProvider {
  name = 'OllamaProvider (qwen3-coder:30b)';

  async debugCode(params: AIDebuggerParams): Promise<AIDebuggerResponse> {
    const result = await OllamaService.generateRepair(params);

    if (!result.success || !result.fixedCode) {
      throw new Error(result.errorMessage || `Ollama repair failed (${result.errorReason || 'UNKNOWN_ERROR'}).`);
    }

    return {
      success: true,
      errorType: params.error?.errorType || 'SyntaxError',
      errorLine: params.error?.line || 1,
      rootCause: result.rootCause || 'Identified anomaly in source code.',
      explanation: result.explanation || 'Applied local qwen3-coder LLM correction.',
      fixedCode: result.fixedCode,
      changes: [],
      confidence: 0.95,
      rawResponse: result.rawResponse
    };
  }
}
