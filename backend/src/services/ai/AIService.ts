import { AIDebuggerParams, AIDebuggerResponse } from './AIProvider';
import { NvidiaProvider } from './NvidiaProvider';
import { LocalFixEngine } from './LocalFixEngine';

export class AIService {
  static async debugCode(params: AIDebuggerParams): Promise<AIDebuggerResponse> {
    try {
      console.log(`[AI-DEBUG] Dispatching repair request to NvidiaProvider...`);
      const nvidiaProvider = new NvidiaProvider();
      return await nvidiaProvider.debugCode(params);
    } catch (nvidiaErr: any) {
      console.warn(`[AI-DEBUG] Remote AI call skipped/failed (${nvidiaErr.message}). Activating instant Local Deterministic AST Engine.`);
      return LocalFixEngine.fixCodeLocally(params);
    }
  }
}
