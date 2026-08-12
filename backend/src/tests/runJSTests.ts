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

async function runJSPhaseTests() {
  console.log('\n===================================================');
  console.log('🧪 CODEFORGE AI — PHASE 2 JAVASCRIPT EXECUTION SUITE');
  console.log('===================================================\n');

  // Test 1: Simple Print Output
  console.log('Test 1: Simple Console Log');
  const t1 = await makePost('/api/executions', {
    language: 'javascript',
    code: 'console.log("Hello CodeForge JS")'
  });
  console.log('  Status:', t1.status, '| Output:', JSON.stringify(t1.stdout.trim()));
  if (t1.stdout.trim() !== 'Hello CodeForge JS') throw new Error('Test 1 Failed');

  // Test 2: Data Structures & Functional Methods
  console.log('\nTest 2: Higher Order Functions (map / reduce)');
  const t2 = await makePost('/api/executions', {
    language: 'javascript',
    code: 'const nums = [1, 2, 3, 4, 5];\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);'
  });
  console.log('  Status:', t2.status, '| Output:', JSON.stringify(t2.stdout.trim()));
  if (t2.stdout.trim() !== 'Sum: 15') throw new Error('Test 2 Failed');

  // Test 3: Reference Error Handling
  console.log('\nTest 3: ReferenceError Handling');
  const t3 = await makePost('/api/executions', {
    language: 'javascript',
    code: 'console.log(undefinedVariable);'
  });
  console.log('  Status:', t3.status, '| Stderr:', JSON.stringify(t3.stderr.trim()));
  if (!t3.stderr.includes('ReferenceError')) throw new Error('Test 3 Failed');

  // Test 4: Syntax Error Handling
  console.log('\nTest 4: SyntaxError Handling');
  const t4 = await makePost('/api/executions', {
    language: 'javascript',
    code: 'console.log("Unclosed String;'
  });
  console.log('  Status:', t4.status, '| Stderr:', JSON.stringify(t4.stderr.trim()));
  if (!t4.stderr.includes('SyntaxError')) throw new Error('Test 4 Failed');

  // Test 5: Timeout Enforcement (5000ms Infinite Loop)
  console.log('\nTest 5: 5000ms Timeout Enforcement');
  const t5 = await makePost('/api/executions', {
    language: 'javascript',
    code: 'while (true) {}'
  });
  console.log('  Status:', t5.status, '| Execution Time:', t5.executionTime + 'ms');
  if (t5.status !== 'timeout') throw new Error('Test 5 Failed');

  // Test 6: Output Buffer Cap (1024 KB)
  console.log('\nTest 6: 1024 KB Output Buffer Cap');
  const t6 = await makePost('/api/executions', {
    language: 'javascript',
    code: 'for (let i = 0; i < 200000; i++) { console.log("CodeForge JS Output Stream ", i); }'
  });
  console.log('  Status:', t6.status, '| Output Size:', t6.stdout.length, 'bytes');
  if (t6.stdout.length < 1000000) throw new Error('Test 6 Failed');

  console.log('===================================================');
  console.log('✅ ALL PHASE 2 JAVASCRIPT TESTS PASSED SUCCESSFULLY!');
  console.log('===================================================\n');
}

runJSPhaseTests().catch(err => {
  console.error('JS Test Error:', err);
  process.exit(1);
});
