import { CJitSimulator } from '../executors/CJitSimulator';
import { CppJitSimulator } from '../executors/CppJitSimulator';

async function testPolyglotCAndCpp() {
  console.log('1. Testing Complex C Polyglot Program with function arrays and printf:');
  const cCode = `// Transpiled C (GCC Standard C17)
#include <stdio.h>

void calculate_grade(double scores[], int n) {
    printf("=== C Polyglot Solution ===\\n");
    double total = 0.0;
    for (int i = 0; i < n; i++) {
        total += scores[i];
    }
    double average = (n > 0) ? (total / n) : 0.0;
    
    char* grade = "F";
    if (average >= 90.0) grade = "A+";
    else if (average >= 75.0) grade = "A";
    else if (average >= 60.0) grade = "B";

    printf("Total: %.2f\\n", total);
    printf("Average: %.2f\\n", average);
    printf("Grade: %s\\n", grade);
}

int main() {
    double scores[] = {85.0, 92.0, 78.0, 90.0};
    int n = sizeof(scores) / sizeof(scores[0]);
    calculate_grade(scores, n);
    return 0;
}`;

  const cRes = await CJitSimulator.execute({ code: cCode });
  console.log('C Execution Result:');
  console.log('Status:', cRes.status, '| ExitCode:', cRes.exitCode);
  console.log('Stdout:\n', cRes.stdout);
  console.log('Stderr:', cRes.stderr);

  console.log('\n2. Testing Complex C++ Polyglot Program:');
  const cppCode = `// Transpiled C++ (G++20 with STL Algorithms)
#include <iostream>
#include <vector>
#include <numeric>
#include <iomanip>

int main() {
    std::cout << "=== C++ Polyglot Solution ===" << std::endl;
    std::vector<double> scores = {85.0, 92.0, 78.0, 90.0};
    
    double total = std::accumulate(scores.begin(), scores.end(), 0.0);
    double average = !scores.empty() ? (total / scores.size()) : 0.0;
    
    std::string grade = "F";
    if (average >= 90.0) grade = "A+";
    else if (average >= 75.0) grade = "A";
    else if (average >= 60.0) grade = "B";

    std::cout << std::fixed << std::setprecision(2);
    std::cout << "Total: " << total << std::endl;
    std::cout << "Average: " << average << std::endl;
    std::cout << "Grade: " << grade << std::endl;
    return 0;
}`;

  console.log('TRANSPILED C++ TO JS:\n', CppJitSimulator.transpileCppToJS(cppCode));
  const cppRes = await CppJitSimulator.execute({ code: cppCode });
  console.log('C++ Execution Result:');
  console.log('Status:', cppRes.status, '| ExitCode:', cppRes.exitCode);
  console.log('Stdout:\n', cppRes.stdout);
  console.log('Stderr:', cppRes.stderr);
}

testPolyglotCAndCpp().catch(console.error);
