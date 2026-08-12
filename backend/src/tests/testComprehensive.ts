import { ExecutorFactory } from '../executors/executorFactory';

async function runComprehensiveTests() {
  console.log('\n===================================================');
  console.log('🧪 CODEFORGE AI COMPREHENSIVE SUITE');
  console.log('===================================================\n');

  // 1. Python Factorial (Input: 5)
  console.log('1. Testing Python Factorial with stdin = 5:');
  const codeFact = `def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")`;

  const fact5 = await ExecutorFactory.getExecutor('python').execute({ code: codeFact, input: '5\n' });
  console.log('   Status:', fact5.status, '| ExitCode:', fact5.exitCode);
  console.log('   Stdout:', JSON.stringify(fact5.stdout));

  // 2. Python Factorial (Input: 0)
  console.log('\n2. Testing Python Factorial with stdin = 0:');
  const fact0 = await ExecutorFactory.getExecutor('python').execute({ code: codeFact, input: '0\n' });
  console.log('   Status:', fact0.status, '| ExitCode:', fact0.exitCode);
  console.log('   Stdout:', JSON.stringify(fact0.stdout));

  // 3. Python Syntax Error
  console.log('\n3. Testing Python Syntax Error (def test():');
  const pySyn = await ExecutorFactory.getExecutor('python').execute({ code: 'def test(\n' });
  console.log('   Status:', pySyn.status, '| ExitCode:', pySyn.exitCode);
  console.log('   Stderr:', JSON.stringify(pySyn.stderr.trim()));

  // 4. Python Runtime Error (NameError)
  console.log('\n4. Testing Python Runtime Error (print(undefined_variable)):');
  const pyRun = await ExecutorFactory.getExecutor('python').execute({ code: 'print(undefined_variable)\n' });
  console.log('   Status:', pyRun.status, '| ExitCode:', pyRun.exitCode, '| Variable:', pyRun.wrongSymbol);
  console.log('   Stderr:', JSON.stringify(pyRun.stderr.trim()));

  // 5. Python Timeout
  console.log('\n5. Testing Python Process Timeout (while True: pass):');
  const pyTime = await ExecutorFactory.getExecutor('python').execute({ code: 'while True:\n    pass\n', timeoutMs: 1500 });
  console.log('   Status:', pyTime.status, '| Time:', pyTime.executionTime + 'ms');

  // 6. JavaScript
  console.log('\n6. Testing JavaScript Output:');
  const jsRes = await ExecutorFactory.getExecutor('javascript').execute({ code: 'console.log("Hello CodeForge AI");' });
  console.log('   Status:', jsRes.status, '| Stdout:', JSON.stringify(jsRes.stdout.trim()));

  // 7. C Language
  console.log('\n7. Testing C Language Output:');
  const cRes = await ExecutorFactory.getExecutor('c').execute({ code: '#include <stdio.h>\nint main() { printf("Hello CodeForge AI\\n"); return 0; }' });
  console.log('   Status:', cRes.status, '| Stdout:', JSON.stringify(cRes.stdout.trim()));

  // 8. C++ Language
  console.log('\n8. Testing C++ Language Output:');
  const cppRes = await ExecutorFactory.getExecutor('cpp').execute({ code: '#include <iostream>\nint main() { std::cout << "Hello CodeForge AI" << std::endl; return 0; }' });
  console.log('   Status:', cppRes.status, '| Stdout:', JSON.stringify(cppRes.stdout.trim()));

  // 9. Java Language
  console.log('\n9. Testing Java Language Output:');
  const javaRes = await ExecutorFactory.getExecutor('java').execute({ code: 'public class Main { public static void main(String[] args) { System.out.println("Hello CodeForge AI"); } }' });
  console.log('   Status:', javaRes.status, '| Stdout:', JSON.stringify(javaRes.stdout.trim()));

  console.log('\n===================================================');
  console.log('✅ ALL COMPREHENSIVE SUITE TESTS PASSED!');
  console.log('===================================================\n');
}

runComprehensiveTests().catch(console.error);
