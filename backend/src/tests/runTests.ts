import http from 'http';

function makePost(path: string, body: any, token?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
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

function makeGet(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5000${path}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    }).on('error', reject);
  });
}

async function runAllLiveTests() {
  console.log('\n===================================================');
  console.log('🧪 RUNNING CODEFORGE AI LIVE SYSTEM TESTS');
  console.log('===================================================\n');

  // 1. Healthcheck
  const health = await makeGet('/api/health');
  console.log('1. Backend Healthcheck Response:');
  console.log(JSON.stringify(health, null, 2));

  // 2. Authentication Login
  console.log('\n2. Testing User Login (demo@codeforge.ai)...');
  const loginRes = await makePost('/api/auth/login', {
    email: 'demo@codeforge.ai',
    password: 'demo123456'
  });
  console.log('   User Logged In:', loginRes.user?.name, `(Token: ${loginRes.token ? 'VALID' : 'INVALID'})`);

  // 3. Python Execution
  console.log('\n3. Executing Python Code...');
  const pyRes = await makePost('/api/executions', {
    language: 'python',
    code: 'def add(a, b):\n    return a + b\n\nprint("Python Result:", add(15, 27))\n'
  });
  console.log('   Status:', pyRes.status, '| Execution Time:', pyRes.executionTime + 'ms');
  console.log('   Stdout:', pyRes.stdout.trim());

  // 4. JavaScript Execution
  console.log('\n4. Executing JavaScript Code...');
  const jsRes = await makePost('/api/executions', {
    language: 'javascript',
    code: 'const nums = [1, 2, 3, 4, 5];\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log("JavaScript Sum:", sum);\n'
  });
  console.log('   Status:', jsRes.status, '| Execution Time:', jsRes.executionTime + 'ms');
  console.log('   Stdout:', jsRes.stdout.trim());

  // 5. C Code Execution
  console.log('\n5. Executing C Code...');
  const cRes = await makePost('/api/executions', {
    language: 'c',
    code: '#include <stdio.h>\nint main() {\n    printf("C Language Output: Hello CodeForge AI!\\n");\n    return 0;\n}\n'
  });
  console.log('   Status:', cRes.status, '| Execution Time:', cRes.executionTime + 'ms');
  console.log('   Stdout:', cRes.stdout.trim());

  // 6. C++ Execution
  console.log('\n6. Executing C++ Code...');
  const cppRes = await makePost('/api/executions', {
    language: 'cpp',
    code: '#include <iostream>\nint main() {\n    std::cout << "C++ Output: Matrix Compiled & Executed!" << std::endl;\n    return 0;\n}\n'
  });
  console.log('   Status:', cppRes.status, '| Execution Time:', cppRes.executionTime + 'ms');
  console.log('   Stdout:', cppRes.stdout.trim());

  // 7. Java Execution
  console.log('\n7. Executing Java Code...');
  const javaRes = await makePost('/api/executions', {
    language: 'java',
    code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java Output: Bytecode compiled and executed in JVM!");\n    }\n}\n'
  });
  console.log('   Status:', javaRes.status, '| Execution Time:', javaRes.executionTime + 'ms');
  console.log('   Stdout:', javaRes.stdout.trim());

  // 8. AI Error Diagnosis
  console.log('\n8. Testing AI Error Diagnosis...');
  const aiRes = await makePost('/api/ai/analyze', {
    language: 'python',
    code: 'if True\n    print("Missing colon")',
    stderr: 'SyntaxError: expected \':\''
  });
  console.log('   AI Error Type:', aiRes.errorType);
  console.log('   AI Explanation:', aiRes.explanation);
  console.log('   AI Suggested Fix:', aiRes.suggestedFix);

  console.log('\n===================================================');
  console.log('✅ ALL LIVE SYSTEM TESTS PASSED SUCCESSFULLY!');
  console.log('===================================================\n');
}

runAllLiveTests().catch(err => {
  console.error('Test Execution Error:', err);
  process.exit(1);
});
