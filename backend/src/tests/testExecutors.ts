import { ExecutorFactory } from '../executors/executorFactory';

async function testAll() {
  console.log('--- TEST 1: Python Valid ---');
  const pyOk = await ExecutorFactory.getExecutor('python').execute({ code: 'print("Hello CodeForge AI")' });
  console.log('Result:', pyOk.status, '| stdout:', JSON.stringify(pyOk.stdout.trim()));

  console.log('--- TEST 2: Python Syntax Error ---');
  const pySyn = await ExecutorFactory.getExecutor('python').execute({ code: 'if True\n    print("hi")' });
  console.log('Result:', pySyn.status, '| line:', pySyn.errorLine, '| stderr:', JSON.stringify(pySyn.stderr.trim()));

  console.log('--- TEST 3: Python Runtime Error ---');
  const pyRun = await ExecutorFactory.getExecutor('python').execute({ code: 'num = 10 / 0' });
  console.log('Result:', pyRun.status, '| stderr:', JSON.stringify(pyRun.stderr.trim()));

  console.log('--- TEST 4: JavaScript Valid ---');
  const jsOk = await ExecutorFactory.getExecutor('javascript').execute({ code: 'console.log("Hello CodeForge AI");' });
  console.log('Result:', jsOk.status, '| stdout:', JSON.stringify(jsOk.stdout.trim()));

  console.log('--- TEST 5: C Valid ---');
  const cOk = await ExecutorFactory.getExecutor('c').execute({ code: '#include <stdio.h>\nint main() { printf("Hello CodeForge AI\\n"); return 0; }' });
  console.log('Result:', cOk.status, '| stdout:', JSON.stringify(cOk.stdout.trim()));

  console.log('--- TEST 6: C++ Valid ---');
  const cppOk = await ExecutorFactory.getExecutor('cpp').execute({ code: '#include <iostream>\nint main() { std::cout << "Hello CodeForge AI" << std::endl; return 0; }' });
  console.log('Result:', cppOk.status, '| stdout:', JSON.stringify(cppOk.stdout.trim()));

  console.log('--- TEST 7: Java Valid ---');
  const javaOk = await ExecutorFactory.getExecutor('java').execute({ code: 'public class Main { public static void main(String[] args) { System.out.println("Hello CodeForge AI"); } }' });
  console.log('Result:', javaOk.status, '| stdout:', JSON.stringify(javaOk.stdout.trim()));

  console.log('--- ALL EXECUTOR TESTS COMPLETED ---');
}

testAll().catch(console.error);
