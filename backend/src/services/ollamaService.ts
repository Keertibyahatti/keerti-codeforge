import { AIDebuggerParams, AIDebuggerResponse } from './ai/AIProvider';
import { buildDebuggerPrompt } from './ai/prompts/debuggerPrompt';
import { CodeValidator } from './execution/CodeValidator';

export interface OllamaServiceConfig {
  baseUrl: string;
  model: string;
  timeoutMs: number;
}

export interface OllamaRepairResult {
  success: boolean;
  fixedCode?: string;
  rootCause?: string;
  explanation?: string;
  errorReason?: 'OLLAMA_UNAVAILABLE' | 'OLLAMA_TIMEOUT' | 'INVALID_AI_RESPONSE' | 'PARSER_FAILURE' | 'REPAIR_NO_PROGRESS' | 'REPAIR_LIMIT_REACHED' | 'SYNTAX_VALIDATION_FAILED';
  errorMessage?: string;
  rawResponse?: string;
}

export class OllamaService {
  private static getConfig(): OllamaServiceConfig {
    return {
      baseUrl: (process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/$/, ''),
      model: process.env.OLLAMA_MODEL || 'qwen3-coder:30b',
      timeoutMs: parseInt(process.env.OLLAMA_TIMEOUT_MS || '15000', 10) // Fast 15s timeout for instant UI response
    };
  }

  /**
   * Health check to verify if Ollama API server is running on localhost:11434
   */
  static async checkHealth(): Promise<{ available: boolean; message: string; version?: string }> {
    const config = this.getConfig();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);

      const res = await globalThis.fetch(`${config.baseUrl}/api/version`, {
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        return {
          available: true,
          message: `Ollama is active on ${config.baseUrl} (Version: ${data.version || '0.32+'}) using model ${config.model}.`,
          version: data.version
        };
      }
      return {
        available: false,
        message: `Ollama endpoint returned HTTP ${res.status}. Please check if Ollama service is active.`
      };
    } catch (err: any) {
      return {
        available: false,
        message: `Could not connect to Ollama at ${config.baseUrl}. Please start Ollama server on Windows (ollama serve). Error: ${err.message}`
      };
    }
  }

  /**
   * Generates AI code repair using local Ollama model (qwen3-coder:30b)
   */
  static async generateRepair(params: AIDebuggerParams): Promise<OllamaRepairResult> {
    const config = this.getConfig();
    const promptText = buildDebuggerPrompt(params);

    console.log(`[OllamaService] Dispatching repair request to ${config.baseUrl} (${config.model})...`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

    try {
      // 1. Try Ollama /api/generate endpoint with stream: false & num_predict limit for speed
      let rawText = '';
      let res = await globalThis.fetch(`${config.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: config.model,
          prompt: promptText,
          stream: false,
          format: 'json',
          options: {
            temperature: 0.1,
            num_predict: 512
          }
        }),
        signal: controller.signal
      });

      if (res.ok) {
        const data = await res.json();
        rawText = data?.response || '';
      } else {
        // Fallback to /api/chat endpoint
        res = await globalThis.fetch(`${config.baseUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: config.model,
            messages: [
              { role: 'system', content: 'You are CodeForge AI Universal Debugger.' },
              { role: 'user', content: promptText }
            ],
            stream: false,
            format: 'json',
            options: {
              temperature: 0.1,
              num_predict: 512
            }
          }),
          signal: controller.signal
        });

        if (res.ok) {
          const data = await res.json();
          rawText = data?.message?.content || '';
        }
      }

      clearTimeout(timeout);

      if (!res.ok && !rawText) {
        const errorText = await res.text().catch(() => '');
        console.warn(`[OllamaService] Ollama HTTP ${res.status}: ${errorText}`);
        return {
          success: false,
          errorReason: 'OLLAMA_UNAVAILABLE',
          errorMessage: `Ollama API error (${res.status}): ${errorText}`
        };
      }

      if (!rawText || rawText.trim().length === 0) {
        return {
          success: false,
          errorReason: 'INVALID_AI_RESPONSE',
          errorMessage: 'Ollama model returned empty response payload.'
        };
      }

      // Parse JSON payload from Ollama
      return this.parseModelPayload(rawText, params);
    } catch (err: any) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        console.warn(`[OllamaService] Request timed out after ${config.timeoutMs}ms. Activating fast dynamic AST fallback.`);
        return {
          success: false,
          errorReason: 'OLLAMA_TIMEOUT',
          errorMessage: `Ollama response timed out after ${config.timeoutMs / 1000}s. Model processing took too long.`
        };
      }

      console.warn(`[OllamaService] Connection failure: ${err.message}`);
      return {
        success: false,
        errorReason: 'OLLAMA_UNAVAILABLE',
        errorMessage: `Cannot reach Ollama at ${config.baseUrl}. Please verify 'ollama serve' is running.`
      };
    }
  }

  private static parseModelPayload(rawText: string, params: AIDebuggerParams): OllamaRepairResult {
    let cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const firstBrace = cleanJson.indexOf('{');
    const lastBrace = cleanJson.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
    }

    try {
      const parsed = JSON.parse(cleanJson);
      let fixedCode = (parsed.fixedCode || parsed.corrected_code || parsed.correctedCode || parsed.code || '').trim();
      fixedCode = CodeValidator.cleanCodeBlock(fixedCode);

      if (!fixedCode || fixedCode.length === 0) {
        return {
          success: false,
          errorReason: 'INVALID_AI_RESPONSE',
          errorMessage: 'Ollama returned JSON payload but fixedCode string was empty or missing.',
          rawResponse: rawText
        };
      }

      return {
        success: true,
        fixedCode,
        rootCause: parsed.rootCause || parsed.root_cause || 'Identified execution/syntax anomaly in candidate code.',
        explanation: parsed.explanation || 'Applied AI structural fix using qwen3-coder model.',
        rawResponse: rawText
      };
    } catch (parseErr: any) {
      // Fallback: If model returned raw code directly instead of JSON object
      const cleanedCode = CodeValidator.cleanCodeBlock(rawText);
      if (cleanedCode && cleanedCode.length > 0 && cleanedCode !== params.code) {
        return {
          success: true,
          fixedCode: cleanedCode,
          rootCause: 'Extracted direct executable code from model output.',
          explanation: 'Extracted raw corrected source code.',
          rawResponse: rawText
        };
      }

      return {
        success: false,
        errorReason: 'PARSER_FAILURE',
        errorMessage: `Failed to parse model JSON: ${parseErr.message}`,
        rawResponse: rawText
      };
    }
  }
}
