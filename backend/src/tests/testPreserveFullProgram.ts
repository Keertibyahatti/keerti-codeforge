import { AIService } from '../services/aiService';

async function testPreserveFullProgram() {
  console.log('===================================================');
  console.log('🧪 TESTING 100% FULL PROGRAM PRESERVATION');
  console.log('===================================================\n');

  const fullProgramWithTrailingCode = `def calculate_sum(a, b):
    result = a + b
    return result

num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

total = calculate_sum(num1, num2)

print("The sum is:", total

print("Calculation completed successfully")
print("Thank you for using CodeForge AI")`;

  console.log('1. Original line count:', fullProgramWithTrailingCode.split('\n').length);
  console.log('2. Submitting code with error on line 10 and 2 trailing print statements:');

  const res = await AIService.autoFix({
    language: 'python',
    code: fullProgramWithTrailingCode,
    stderr: "SyntaxError: '(' was never closed (line 10)",
    userInput: '10\n20\n',
    errorLine: 10
  });

  console.log('\n--- AUTO-FIX RESULT ---');
  console.log('Success:', res.success);
  console.log('Fixed Code Line Count:', res.fixedCode.split('\n').length);
  console.log('Preserved Line 12:', res.fixedCode.includes('Calculation completed successfully'));
  console.log('Preserved Line 13:', res.fixedCode.includes('Thank you for using CodeForge AI'));
  console.log('\nFull Execution Output:\n' + res.stdout);

  if (
    res.success &&
    res.fixedCode.includes('Calculation completed successfully') &&
    res.fixedCode.includes('Thank you for using CodeForge AI') &&
    res.stdout?.includes('Calculation completed successfully') &&
    res.stdout?.includes('Thank you for using CodeForge AI')
  ) {
    console.log('===================================================');
    console.log('✅ 100% FULL PROGRAM PRESERVATION TEST PASSED!');
    console.log('===================================================');
  } else {
    console.error('❌ Preservation check failed.');
    process.exit(1);
  }
}

testPreserveFullProgram().catch(console.error);
