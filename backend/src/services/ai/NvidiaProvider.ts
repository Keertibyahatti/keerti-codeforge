import { AIProvider, AIDebuggerParams, AIDebuggerResponse } from './AIProvider';
import { NvidiaService } from './NvidiaService';

export class NvidiaProvider implements AIProvider {
  name = 'NvidiaProvider (NVIDIA Build Cloud API)';

  async debugCode(params: AIDebuggerParams): Promise<AIDebuggerResponse> {
    return await NvidiaService.debugCode(params);
  }
}
