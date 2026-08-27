import { CodeGeneratorEngine } from '../services/ai/CodeGeneratorEngine';

async function testGenerator() {
  console.log('--- Testing CodeGeneratorEngine: Binary Search Tree in Python ---');
  const res1 = await CodeGeneratorEngine.generateCode({
    prompt: 'Create a Binary Search Tree with insert and search methods',
    language: 'python'
  });
  console.log('Title:', res1.title);
  console.log('Language:', res1.language);
  console.log('Time Complexity:', res1.timeComplexity);
  console.log('Generated Code Snippet:\n', res1.generatedCode.substring(0, 200) + '...\n');

  console.log('--- Testing CodeGeneratorEngine: Dijkstra in C++ ---');
  const res2 = await CodeGeneratorEngine.generateCode({
    prompt: "Dijkstra's shortest path algorithm",
    language: 'cpp'
  });
  console.log('Title:', res2.title);
  console.log('Complexity:', res2.timeComplexity);
  console.log('Generated Code Snippet:\n', res2.generatedCode.substring(0, 200) + '...\n');
}

testGenerator().catch(console.error);
