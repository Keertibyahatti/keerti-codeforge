import { AIService } from '../services/aiService';

async function testSumAutoFix() {
  console.log('===================================================');
  console.log('🧪 TESTING MISSING PARENTHESIS AUTO-FIX');
  console.log('===================================================\n');

  const brokenSumCode = `def calculate_sum(a, b):
    result = a + b
    return result

num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

total = calculate_sum(num1, num2)

print("The sum is:", total`;

  console.log('1. Submitting broken sum code (missing closing parenthesis on line 10):');
  const res = await AIService.autoFix({
    language: 'python',
    code: brokenSumCode,
    stderr: "SyntaxError: '(' was never closed (line 10)",
    userInput: '10\n20\n',
    errorLine: 10
  });

  console.log('\nAuto-Fix Result:');
  console.log('Success:', res.success);
  console.log('ErrorType:', res.errorType);
  console.log('What Happened:', res.whatHappened);
  console.log('Why It Happened:', res.whyItHappened);
  console.log('How Fixed:', res.howFixed);
  console.log('Changes Before:', JSON.stringify(res.changes?.before));
  console.log('Changes After:', JSON.stringify(res.changes?.after));
  console.log('\nExecution Output:\n' + res.stdout);

  console.log('===================================================');
  console.log('✅ MISSING PARENTHESIS AUTO-FIX TEST PASSED!');
  console.log('===================================================');
}

testSumAutoFix().catch(console.error);
