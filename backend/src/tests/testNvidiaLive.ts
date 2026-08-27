import dotenv from 'dotenv';
dotenv.config();

import { NvidiaService } from '../services/ai/NvidiaService';

async function testNvidiaLive() {
  console.log('Testing NVIDIA AI Integration with configured API Key...');
  const key = process.env.NVIDIA_API_KEY || process.env.AI_API_KEY;
  console.log('Key detected:', key ? `${key.substring(0, 10)}...${key.substring(key.length - 4)}` : 'NONE');

  try {
    console.log('\n--- 1. Testing AI Chat with NVIDIA Llama 3.3 70B ---');
    const chatReply = await NvidiaService.chatWithAI('Explain binary search in Python in 2 lines');
    console.log('Chat Response:\n', chatReply);

    console.log('\n--- 2. Testing Multi-Language Generation with NVIDIA Llama 3.3 70B ---');
    const multiLang = await NvidiaService.generateMultiLangCode('Compute factorial of n');
    console.log('Problem Title:', multiLang.title);
    console.log('Python snippet:\n', multiLang.codes.python.substring(0, 120) + '...\n');
    console.log('JavaScript snippet:\n', multiLang.codes.javascript.substring(0, 120) + '...\n');

    console.log('\n--- 3. Testing AI Debugger with NVIDIA Llama 3.3 70B ---');
    const debugResult = await NvidiaService.debugCode({
      language: 'python',
      code: 'def add(a, b)\n    return a + b\n\nprint(add(2, 3))',
      error: {
        errorType: 'SyntaxError',
        message: 'expected \':\'',
        line: 1,
        traceback: 'SyntaxError: expected \':\'',
        rawStderr: '  File "main.py", line 1\n    def add(a, b)\n                 ^\nSyntaxError: expected \':\''
      },
      attempt: 1,
      maxAttempts: 5
    });
    console.log('Fixed Code:\n', debugResult.fixedCode);
    console.log('Root Cause:', debugResult.rootCause);
    console.log('Explanation:', debugResult.explanation);

    console.log('\n=============================================');
    console.log('🎉 ALL NVIDIA AI API INTEGRATIONS ARE LIVE & WORKING!');
    console.log('=============================================');
  } catch (err: any) {
    console.error('NVIDIA AI test failed:', err);
  }
}

testNvidiaLive();
