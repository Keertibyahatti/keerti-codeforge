import { PythonExecutor } from '../executors/pythonExecutor';
import { AIService } from '../services/aiService';

async function testReAutoFix() {
  console.log('===================================================');
  console.log('🧪 TESTING "re" BASE-CASE RETURN AUTO-FIX');
  console.log('===================================================\n');

  const codeFromScreenshot = `# CodeForge AI — Python Runner

def calculate_factorial(n):
    if n <= 1:
        re
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")`;

  console.log('1. Executing code containing "re" on line 5:');
  const execRes = await new PythonExecutor().execute({ code: codeFromScreenshot, input: '1' });
  console.log('Execution Status:', execRes.status);
  console.log('Parsed Error Line:', execRes.errorLine);
  console.log('Wrong Symbol:', execRes.wrongSymbol);

  if (execRes.errorLine === 5) {
    console.log('✅ PythonExecutor correctly identified Line 5 as the exception line!');
  } else {
    console.warn(`⚠️ Error line was parsed as ${execRes.errorLine}`);
  }

  console.log('\n2. Submitting code to Auto-Fix Pipeline:');
  const fixRes = await AIService.autoFix({
    language: 'python',
    code: codeFromScreenshot,
    stderr: execRes.stderr,
    userInput: '1',
    errorLine: execRes.errorLine
  });

  console.log('Auto-Fix Success:', fixRes.success);
  console.log('ErrorType:', fixRes.errorType);
  console.log('Changes Before:', JSON.stringify(fixRes.changes?.before));
  console.log('Changes After:', JSON.stringify(fixRes.changes?.after));
  console.log('\nFinal Execution Output:\n' + fixRes.stdout);

  if (fixRes.success && fixRes.fixedCode.includes('return 1') && fixRes.stdout?.includes('Factorial of 1 is 1')) {
    console.log('===================================================');
    console.log('✅ BASE-CASE "re" AUTO-FIX TEST PASSED!');
    console.log('===================================================');
  } else {
    console.error('❌ Auto-Fix test failed.');
    process.exit(1);
  }
}

testReAutoFix().catch(console.error);
