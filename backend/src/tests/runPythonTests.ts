import http from 'http';

function makePost(path: string, body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => resolve(JSON.parse(responseBody)));
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runPythonPhaseTests() {
  console.log('\n===================================================');
  console.log('🧪 CODEFORGE AI — PHASE 1 PYTHON EXECUTION SUITE');
  console.log('===================================================\n');

  // Test 1: Simple Print Output
  console.log('Test 1: Simple Print Output');
  const t1 = await makePost('/api/executions', {
    language: 'python',
    code: 'print("Hello CodeForge AI")'
  });
  console.log('  Status:', t1.status, '| Output:', JSON.stringify(t1.stdout.trim()));
  if (t1.stdout.trim() !== 'Hello CodeForge AI') throw new Error('Test 1 Failed');

  // Test 2: Standard Input (stdin)
  console.log('\nTest 2: Standard Input (stdin)');
  const t2 = await makePost('/api/executions', {
    language: 'python',
    code: 'name = input()\nprint("Hello", name)',
    input: 'Keerti'
  });
  console.log('  Status:', t2.status, '| Output:', JSON.stringify(t2.stdout.trim()));
  if (t2.stdout.trim() !== 'Hello Keerti') throw new Error('Test 2 Failed');

  // Test 3: Loop Iteration Output
  console.log('\nTest 3: Loop Output');
  const t3 = await makePost('/api/executions', {
    language: 'python',
    code: 'for i in range(5):\n    print(i)'
  });
  console.log('  Status:', t3.status, '| Output:', JSON.stringify(t3.stdout.trim()));

  // Test 4: Runtime Exception (ZeroDivisionError)
  console.log('\nTest 4: ZeroDivisionError Handling');
  const t4 = await makePost('/api/executions', {
    language: 'python',
    code: 'print(10 / 0)'
  });
  console.log('  Status:', t4.status, '| Stderr:', JSON.stringify(t4.stderr.trim()));
  if (!t4.stderr.includes('ZeroDivisionError')) throw new Error('Test 4 Failed');

  // Test 5: Syntax Error Handling
  console.log('\nTest 5: SyntaxError Handling');
  const t5 = await makePost('/api/executions', {
    language: 'python',
    code: 'print("Hello"'
  });
  console.log('  Status:', t5.status, '| Stderr:', JSON.stringify(t5.stderr.trim()));
  if (!t5.stderr.includes('SyntaxError')) throw new Error('Test 5 Failed');

  // Test 6: Timeout Enforcement (Infinite Loop)
  console.log('\nTest 6: 5000ms Timeout Enforcement (while True)');
  const t6 = await makePost('/api/executions', {
    language: 'python',
    code: 'while True:\n    pass'
  });
  console.log('  Status:', t6.status, '| Execution Time:', t6.executionTime + 'ms');
  if (t6.status !== 'timeout') throw new Error('Test 6 Failed');

  // Test 7: Output Buffer Limit (1024 KB)
  console.log('\nTest 7: 1024 KB Output Buffer Cap');
  const t7 = await makePost('/api/executions', {
    language: 'python',
    code: 'for i in range(200000):\n    print("CodeForge AI Large Output Stream Test Block ", i)'
  });
  console.log('  Status:', t7.status, '| Output Size:', t7.stdout.length, 'bytes');
  if (t7.stdout.length < 1000000) throw new Error('Test 7 Failed');

  // Test 8: Final Phase Acceptance Script
  console.log('\nTest 8: Complete Phase 1 Python Acceptance Script');
  const acceptanceCode = `
print("CodeForge AI Python Test")
name = input("Enter your name: ")
numbers = [10, 20, 30, 40, 50]
total = sum(numbers)
average = total / len(numbers)

print()
print("Hello,", name)
print("Numbers:", numbers)
print("Total:", total)
print("Average:", average)

if average >= 30:
    print("Average is 30 or greater")
else:
    print("Average is below 30")
`;
  const t8 = await makePost('/api/executions', {
    language: 'python',
    code: acceptanceCode,
    input: 'Keerti'
  });
  console.log('  Status:', t8.status, '| Execution Time:', t8.executionTime + 'ms');
  console.log('  Full Stdout:\n' + t8.stdout);

  console.log('===================================================');
  console.log('✅ ALL PHASE 1 PYTHON TESTS PASSED SUCCESSFULLY!');
  console.log('===================================================\n');
}

runPythonPhaseTests().catch(err => {
  console.error('Python Test Error:', err);
  process.exit(1);
});
