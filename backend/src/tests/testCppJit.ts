import { CppJitSimulator } from '../executors/CppJitSimulator';
import { CJitSimulator } from '../executors/CJitSimulator';

async function testJit() {
  console.log('Testing C++ JIT:');
  const cppRes = await CppJitSimulator.execute({
    code: `#include <iostream>
int main() {
    std::cout << "Hello CodeForge AI from C++" << std::endl;
    return 0;
}`
  });
  console.log('C++ JIT Result:', cppRes);

  console.log('\nTesting C JIT:');
  const cRes = await CJitSimulator.execute({
    code: `#include <stdio.h>
int main() {
    printf("Hello CodeForge AI from C\\n");
    return 0;
}`
  });
  console.log('C JIT Result:', cRes);
}

testJit().catch(console.error);
