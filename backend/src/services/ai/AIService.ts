import { AIProvider, AIDebuggerParams, AIDebuggerResponse } from './AIProvider';
import { NvidiaProvider } from './NvidiaProvider';
import { OllamaProvider } from './OllamaProvider';

export class AIService {
  static async debugCode(params: AIDebuggerParams): Promise<AIDebuggerResponse> {
    // 1. Primary AI Provider: NVIDIA Build API
    try {
      console.log(`[AI-DEBUG] Attempting Primary Repair Provider: NvidiaProvider...`);
      const nvidiaProvider = new NvidiaProvider();
      return await nvidiaProvider.debugCode(params);
    } catch (nvidiaErr: any) {
      console.warn(`[AI-DEBUG] Primary NvidiaProvider failed (${nvidiaErr.message}). Attempting Secondary Ollama Fallback...`);
    }

    // 2. Secondary AI Provider: Ollama (Optional Fallback)
    try {
      console.log(`[AI-DEBUG] Attempting Secondary Repair Provider: OllamaProvider...`);
      const ollamaProvider = new OllamaProvider();
      return await ollamaProvider.debugCode(params);
    } catch (ollamaErr: any) {
      console.warn(`[AI-DEBUG] Secondary OllamaProvider failed (${ollamaErr.message}). Activating Local Deterministic AST Engine.`);
    }

    // 3. Fallback: Throw error to trigger Local Deterministic AST Engine in DebugOrchestrator
    throw new Error('AI providers unavailable. Activating Local Deterministic AST Engine.');
  }
}
