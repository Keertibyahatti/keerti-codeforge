import { DebugOrchestrator } from '../services/execution/DebugOrchestrator';

async function testCppAutoFix() {
  console.log('Testing C++ AI Auto-Fix:');
  const brokenCpp = `#include <iostream>
int main() {
    int x = 10
    std::cout << "Value: " << x << std::endl;
    return 0;
}`;

  const res = await DebugOrchestrator.autoRepairAndRun({
    language: 'cpp',
    code: brokenCpp
  });

  console.log('C++ Auto-Fix Success:', res.success);
  console.log('Final Code:\n', res.finalCode);
  console.log('Output:\n', res.output);
  console.log('Error:', res.error);
}

testCppAutoFix().catch(console.error);
