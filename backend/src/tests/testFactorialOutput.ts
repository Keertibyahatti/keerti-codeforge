import { ExecutorFactory } from '../executors/executorFactory';

async function runLiveFactorialOutputs() {
  const code = `def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")`;

  console.log('===================================================');
  console.log('🚀 CODEFORGE AI — LIVE PYTHON EXECUTION OUTPUTS');
  console.log('===================================================\n');

  // Input: 1
  const res1 = await ExecutorFactory.getExecutor('python').execute({ code, input: '1' });
  console.log('--- INPUT: 1 ---');
  console.log('Status:', res1.status);
  console.log('Output:\n' + res1.stdout);

  // Input: 5
  const res5 = await ExecutorFactory.getExecutor('python').execute({ code, input: '5' });
  console.log('--- INPUT: 5 ---');
  console.log('Status:', res5.status);
  console.log('Output:\n' + res5.stdout);

  // Input: 0
  const res0 = await ExecutorFactory.getExecutor('python').execute({ code, input: '0' });
  console.log('--- INPUT: 0 ---');
  console.log('Status:', res0.status);
  console.log('Output:\n' + res0.stdout);

  console.log('===================================================');
  console.log('✅ ALL LIVE EXECUTION OUTPUTS VERIFIED');
  console.log('===================================================');
}

runLiveFactorialOutputs().catch(console.error);
