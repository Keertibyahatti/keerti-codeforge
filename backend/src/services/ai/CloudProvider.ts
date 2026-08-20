import { AIProvider, AIDebuggerParams, AIDebuggerResponse } from './AIProvider';
import { buildDebuggerPrompt } from './prompts/debuggerPrompt';

export class CloudProvider implements AIProvider {
  name = 'CloudProvider (NVIDIA NIM / OpenAI / Gemini)';

  async debugCode(params: AIDebuggerParams): Promise<AIDebuggerResponse> {
    const apiKey = (process.env.AI_API_KEY || process.env.NVIDIA_API_KEY || process.env.OPENAI_API_KEY || '').trim();
    const baseUrl = (process.env.AI_BASE_URL || process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1').replace(/\/$/, '');
    const modelName = process.env.AI_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b';

    if (!apiKey || apiKey.length === 0) {
      throw new Error('AI_API_KEY environment variable is not configured.');
    }

    const promptText = buildDebuggerPrompt(params);

    try {
      let rawText = '';

      // 1. If key is NVIDIA NIM API (nvapi-...) or base_url contains nvidia/openai format
      if (apiKey.startsWith('nvapi-') || baseUrl.includes('nvidia') || baseUrl.includes('openai') || baseUrl.includes('/v1')) {
        console.log(`[CloudProvider] Dispatching repair to NVIDIA NIM / OpenAI compatible endpoint (${baseUrl}/chat/completions)...`);
        
        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: 'system', content: 'You are CodeForge AI Universal Debugger. You MUST return ONLY valid JSON.' },
              { role: 'user', content: promptText }
            ],
            temperature: 0.1,
            max_tokens: 4096
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`NVIDIA NIM / OpenAI API error (${response.status}): ${errText}`);
        }

        const data = await response.json();
        rawText = data?.choices?.[0]?.message?.content || '';
      } else {
        // 2. Google Gemini API endpoint
        console.log(`[CloudProvider] Dispatching repair to Google Gemini API (${modelName})...`);
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              generationConfig: {
                maxOutputTokens: 4096,
                temperature: 0.1,
                responseMimeType: 'application/json'
              }
            })
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Gemini Cloud API error (${response.status}): ${errText}`);
        }

        const data = await response.json();
        rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }

      if (!rawText || rawText.trim().length === 0) {
        throw new Error('Empty response payload from Cloud AI model provider.');
      }

      return this.parseResponse(rawText, params);
    } catch (err: any) {
      console.warn('[CloudProvider] Call failed:', err.message);
      throw err;
    }
  }

  private parseResponse(rawText: string, params: AIDebuggerParams): AIDebuggerResponse {
    let cleanJson = rawText
      .replace(/```json/gi, '')
      .replace(/```python/gi, '')
      .replace(/```/g, '')
      .trim();

    const firstBrace = cleanJson.indexOf('{');
    const lastBrace = cleanJson.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
    }

    try {
      const parsed = JSON.parse(cleanJson);
      let fixedCode = (parsed.fixedCode || parsed.corrected_code || parsed.correctedCode || parsed.code || '').trim();

      // Remove fence if model accidentally included it in fixedCode string
      fixedCode = fixedCode.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();

      return {
        success: Boolean(parsed.success ?? true),
        errorType: parsed.errorType || params.error?.errorType || 'SyntaxError',
        errorLine: parsed.errorLine || params.error?.line || 1,
        rootCause: parsed.rootCause || parsed.root_cause || 'Detected syntax or logic flaw in source code.',
        explanation: parsed.explanation || 'Applied AI structural fix to resolve execution error.',
        fixedCode: fixedCode || params.code,
        changes: Array.isArray(parsed.changes) ? parsed.changes : [],
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.95,
        rawResponse: rawText
      };
    } catch (parseErr: any) {
      throw new Error(`Failed to parse AI JSON response: ${parseErr.message}`);
    }
  }
}
