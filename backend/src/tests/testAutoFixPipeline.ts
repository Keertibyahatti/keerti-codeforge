import { AIService } from '../services/aiService';

async function testAutoFixPipeline() {
  console.log('===================================================');
  console.log('🧪 TESTING 8-STEP AUTO-FIX PIPELINE');
  console.log('===================================================\n');

  const brokenCode = `# CodeForge AI — Python Runner

def calculate_factorial(n):
    if n <=
        return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")`;

  console.log('1. Submitting broken code with "if n <=":');
  const res = await AIService.autoFix({
    language: 'python',
    code: brokenCode,
    stderr: 'SyntaxError: invalid syntax (line 4)',
    userInput: '1',
    errorLine: 4
  });

  console.log('\nAuto-Fix Result:');
  console.log('Success:', res.success);
  console.log('ErrorType:', res.errorType);
  console.log('What Happened:', res.whatHappened);
  console.log('Why It Happened:', res.whyItHappened);
  console.log('How Fixed:', res.howFixed);
  console.log('Changes Before:', JSON.stringify(res.changes?.before));
  console.log('Changes After:', JSON.stringify(res.changes?.after));
  console.log('Execution Output:\n' + res.stdout);

  console.log('===================================================');
  console.log('✅ AUTO-FIX PIPELINE TEST COMPLETED');
  console.log('===================================================');
}

testAutoFixPipeline().catch(console.error);
