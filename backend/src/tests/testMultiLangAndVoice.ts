import { CodeGeneratorEngine } from '../services/ai/CodeGeneratorEngine';
import { ErrorParser } from '../services/execution/ErrorParser';

async function verifyLanguageSwitchAndErrors() {
  console.log('=== TEST 1: Generate Code with Multi-Language Matrix ===');
  const res = await CodeGeneratorEngine.generateCode({
    prompt: 'Implement LRU Cache',
    language: 'python'
  });

  console.log('Primary Language:', res.language);
  console.log('Available Multi-Lang Keys:', Object.keys(res.multiLangCodes));
  console.log('Python length:', res.multiLangCodes.python?.length);
  console.log('JavaScript length:', res.multiLangCodes.javascript?.length);
  console.log('TypeScript length:', res.multiLangCodes.typescript?.length);
  console.log('C++ length:', res.multiLangCodes.cpp?.length);
  console.log('C length:', res.multiLangCodes.c?.length);
  console.log('Java length:', res.multiLangCodes.java?.length);

  console.log('\n=== TEST 2: Exact Error Line Detection & Snippet Extraction ===');
  const faultyCode = `def compute_ratio(x, y):
    total = x + y
    return total / 0

print(compute_ratio(10, 20))`;

  const stderr = `Traceback (most recent call last):
  File "main.py", line 3, in compute_ratio
    return total / 0
ZeroDivisionError: division by zero`;

  const parsed = ErrorParser.parse(stderr, 'python', faultyCode);
  console.log('Detected Error Line:', parsed.line);
  console.log('Extracted Snippet:', parsed.errorSnippet);
  console.log('Category:', parsed.errorType);
  console.log('What happened:', parsed.whatHappened);
  console.log('Why it happened:', parsed.whyItHappened);
  console.log('How to fix:', parsed.howToFix);
}

verifyLanguageSwitchAndErrors().catch(console.error);
