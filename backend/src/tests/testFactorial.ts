import { ExecutorFactory } from '../executors/executorFactory';

async function testInteractiveFactorial() {
  const code = `def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")`;

  console.log('--- TEST 1: Stdin = 5 ---');
  const res5 = await ExecutorFactory.getExecutor('python').execute({ code, input: '5\n' });
  console.log('Status 5:', res5.status, '| stdout:', JSON.stringify(res5.stdout));

  console.log('--- TEST 2: Stdin = 0 ---');
  const res0 = await ExecutorFactory.getExecutor('python').execute({ code, input: '0\n' });
  console.log('Status 0:', res0.status, '| stdout:', JSON.stringify(res0.stdout));

  console.log('--- TEST 3: Invalid NameError Code (nu) ---');
  const errCode = `def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

nu
print(f"Factorial of {num} is {calculate_factorial(num)}")`;
  const resErr = await ExecutorFactory.getExecutor('python').execute({ code: errCode });
  console.log('Status Err:', resErr.status, '| line:', resErr.errorLine, '| wrongSymbol:', resErr.wrongSymbol, '| stderr:', JSON.stringify(resErr.stderr.trim()));
}

testInteractiveFactorial().catch(console.error);
