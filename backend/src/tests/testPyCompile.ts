import { PythonExecutor } from '../executors/pythonExecutor';

function testPyCompile() {
  console.log('--- TEST 1: Valid Code ---');
  const validRes = PythonExecutor.validateSyntax('print("Hello CodeForge AI")');
  console.log('Valid Result:', validRes);

  console.log('\n--- TEST 2: Syntax Error (def hello() ---');
  const invalidRes = PythonExecutor.validateSyntax('def hello(\n');
  console.log('Invalid Result:', invalidRes);
}

testPyCompile();
