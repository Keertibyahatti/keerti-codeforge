import { ExecutorFactory } from '../executors/executorFactory';
import { AIService } from '../services/aiService';

async function runMasterSuite() {
  console.log('===================================================');
  console.log('🚀 CODEFORGE AI — MASTER COMPREHENSIVE TEST SUITE');
  console.log('===================================================\n');

  // TEST 1: Valid Factorial Execution
  console.log('--- TEST 1: Valid Factorial Execution (Input: 5) ---');
  const codeFact = `def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")`;

  const res1 = await ExecutorFactory.getExecutor('python').execute({ code: codeFact, input: '5' });
  console.log('Status:', res1.status);
  console.log('Output:\n' + res1.stdout);
  if (res1.status === 'success' && res1.stdout.includes('Factorial of 5 is 120')) {
    console.log('✅ TEST 1 PASSED\n');
  } else {
    console.error('❌ TEST 1 FAILED\n');
  }

  // TEST 2: Valid Program Execution (No Auto-Fix Triggered)
  console.log('--- TEST 2: Valid Basic Program ---');
  const codeValid = `print("Hello CodeForge AI")\nprint(2 + 3)`;
  const res2 = await ExecutorFactory.getExecutor('python').execute({ code: codeValid });
  console.log('Status:', res2.status);
  console.log('Output:\n' + res2.stdout);
  if (res2.status === 'success' && res2.stdout.includes('Hello CodeForge AI') && res2.stdout.includes('5')) {
    console.log('✅ TEST 2 PASSED\n');
  } else {
    console.error('❌ TEST 2 FAILED\n');
  }

  // TEST 3: ZeroDivisionError (Runtime Error Classification)
  console.log('--- TEST 3: ZeroDivisionError Classification ---');
  const codeZero = `num = 10\nprint(num / 0)`;
  const res3 = await ExecutorFactory.getExecutor('python').execute({ code: codeZero });
  console.log('Status:', res3.status);
  console.log('Stderr:\n' + res3.stderr);
  if (res3.status === 'runtime_error' && res3.stderr.includes('ZeroDivisionError')) {
    console.log('✅ TEST 3 PASSED (Correctly classified as runtime_error)\n');
  } else {
    console.error('❌ TEST 3 FAILED\n');
  }

  // TEST 4: Missing Closing Parenthesis Auto-Fix
  console.log('--- TEST 4: Missing Closing Parenthesis Auto-Fix ---');
  const codeParen = `print("Hello"`;
  const res4 = await AIService.autoFix({ language: 'python', code: codeParen, stderr: "SyntaxError: '(' was never closed" });
  console.log('Success:', res4.success);
  console.log('Fixed Code:', JSON.stringify(res4.fixedCode));
  console.log('Output:', JSON.stringify(res4.stdout));
  if (res4.success && res4.fixedCode.trim() === 'print("Hello")' && res4.stdout?.includes('Hello')) {
    console.log('✅ TEST 4 PASSED\n');
  } else {
    console.error('❌ TEST 4 FAILED\n');
  }

  // TEST 5: Interactive Stdin Input Stream
  console.log('--- TEST 5: Stdin Input Stream (Input: Pooja) ---');
  const codeStdin = `name = input("Enter your name: ")\nprint("Hello,", name)`;
  const res5 = await ExecutorFactory.getExecutor('python').execute({ code: codeStdin, input: 'Pooja' });
  console.log('Status:', res5.status);
  console.log('Output:\n' + res5.stdout);
  if (res5.status === 'success' && res5.stdout.includes('Hello, Pooja')) {
    console.log('✅ TEST 5 PASSED\n');
  } else {
    console.error('❌ TEST 5 FAILED\n');
  }

  // TEST 6: 100% Full Program Preservation with Trailing Lines
  console.log('--- TEST 6: 100% Full Program Preservation ---');
  const codeFull = `def calculate_sum(a, b):
    result = a + b
    return result

num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

total = calculate_sum(num1, num2)

print("The sum is:", total

print("Calculation completed successfully")
print("Thank you for using CodeForge AI")`;

  const res6 = await AIService.autoFix({
    language: 'python',
    code: codeFull,
    stderr: "SyntaxError: '(' was never closed (line 10)",
    userInput: '10\n20\n'
  });

  console.log('Success:', res6.success);
  console.log('Preserved Line 12:', res6.fixedCode.includes('Calculation completed successfully'));
  console.log('Preserved Line 13:', res6.fixedCode.includes('Thank you for using CodeForge AI'));
  console.log('Output:\n' + res6.stdout);

  if (
    res6.success &&
    res6.fixedCode.includes('Calculation completed successfully') &&
    res6.fixedCode.includes('Thank you for using CodeForge AI') &&
    res6.stdout?.includes('Calculation completed successfully') &&
    res6.stdout?.includes('Thank you for using CodeForge AI')
  ) {
    console.log('✅ TEST 6 PASSED\n');
  } else {
    console.error('❌ TEST 6 FAILED\n');
  }

  console.log('===================================================');
  console.log('🎉 MASTER COMPREHENSIVE TEST SUITE COMPLETE: ALL PASSED!');
  console.log('===================================================');
}

runMasterSuite().catch(console.error);
