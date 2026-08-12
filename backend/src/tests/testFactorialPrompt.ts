import { ExecutorFactory } from '../executors/executorFactory';

async function testFactorialPrompt() {
  const code = `def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")`;

  console.log('--- TEST 1: Stdin = 1 ---');
  const res1 = await ExecutorFactory.getExecutor('python').execute({ code, input: '1' });
  console.log('Status 1:', res1.status, '| stdout:', JSON.stringify(res1.stdout));

  console.log('--- TEST 2: Stdin = 5 ---');
  const res5 = await ExecutorFactory.getExecutor('python').execute({ code, input: '5' });
  console.log('Status 5:', res5.status, '| stdout:', JSON.stringify(res5.stdout));

  console.log('--- TEST 3: Stdin = 0 ---');
  const res0 = await ExecutorFactory.getExecutor('python').execute({ code, input: '0' });
  console.log('Status 0:', res0.status, '| stdout:', JSON.stringify(res0.stdout));

  console.log('--- TEST 4: Signature Mismatch TypeError (def calculate_factorial():) ---');
  const errCode = `def calculate_factorial():
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")`;

  const resErr = await ExecutorFactory.getExecutor('python').execute({ code: errCode, input: '1' });
  console.log('Status Err:', resErr.status, '| wrongSymbol:', resErr.wrongSymbol, '| suggestedFixSymbol:', resErr.suggestedFixSymbol, '| stderr:', JSON.stringify(resErr.stderr.trim()));
}

testFactorialPrompt().catch(console.error);
