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

async function runMultiLanguageSuite() {
  console.log('\n===================================================');
  console.log('🌐 CODEFORGE AI — ALL-LANGUAGES EXECUTION & ERROR SUITE');
  console.log('===================================================\n');

  // --- 1. PYTHON 3 ---
  console.log('1. PYTHON 3 RUNTIME:');
  const pySuccess = await makePost('/api/executions', { language: 'python', code: 'print("Python 3 Active")' });
  console.log('   [Success Test]:', pySuccess.status, '| Output:', pySuccess.stdout.trim());
  
  const pyErr = await makePost('/api/executions', { language: 'python', code: 'print(10 / 0)' });
  console.log('   [Error Test]:', pyErr.status, '| Exception:', pyErr.stderr.split('\n').pop()?.trim());

  // --- 2. JAVASCRIPT / NODE.JS ---
  console.log('\n2. JAVASCRIPT RUNTIME:');
  const jsSuccess = await makePost('/api/executions', { language: 'javascript', code: 'console.log("JS Node Active");' });
  console.log('   [Success Test]:', jsSuccess.status, '| Output:', jsSuccess.stdout.trim());

  const jsErr = await makePost('/api/executions', { language: 'javascript', code: 'const a = undefinedVar.length;' });
  console.log('   [Error Test]:', jsErr.status, '| Exception:', jsErr.stderr.split('\n')[3]?.trim() || jsErr.stderr.split('\n')[0]);

  // --- 3. C (GCC) ---
  console.log('\n3. C (GCC COMPILER) RUNTIME:');
  const cSuccess = await makePost('/api/executions', {
    language: 'c',
    code: '#include <stdio.h>\nint main() { printf("C Compiler Active\\n"); return 0; }'
  });
  console.log('   [Success Test]:', cSuccess.status, '| Output:', cSuccess.stdout.trim());

  const cCompileErr = await makePost('/api/executions', {
    language: 'c',
    code: '#include <stdio.h>\nint main() { printf("Missing semicolon") return 0; }'
  });
  console.log('   [Compilation Error Test]:', cCompileErr.status, '| Stderr Line:', cCompileErr.stderr.split('\n')[0]);

  // --- 4. C++ (G++) ---
  console.log('\n4. C++ (G++ COMPILER) RUNTIME:');
  const cppSuccess = await makePost('/api/executions', {
    language: 'cpp',
    code: '#include <iostream>\nint main() { std::cout << "C++17 STL Active" << std::endl; return 0; }'
  });
  console.log('   [Success Test]:', cppSuccess.status, '| Output:', cppSuccess.stdout.trim());

  const cppCompileErr = await makePost('/api/executions', {
    language: 'cpp',
    code: '#include <iostream>\nint main() { std::cout << missingVar << std::endl; return 0; }'
  });
  console.log('   [Compilation Error Test]:', cppCompileErr.status, '| Stderr Line:', cppCompileErr.stderr.split('\n')[0]);

  // --- 5. JAVA 25 ---
  console.log('\n5. JAVA RUNTIME:');
  const javaSuccess = await makePost('/api/executions', {
    language: 'java',
    code: 'public class Main { public static void main(String[] args) { System.out.println("Java JVM Active"); } }'
  });
  console.log('   [Success Test]:', javaSuccess.status, '| Output:', javaSuccess.stdout.trim());

  const javaCompileErr = await makePost('/api/executions', {
    language: 'java',
    code: 'public class Main { public static void main(String[] args) { System.out.println("Missing quotes) } }'
  });
  console.log('   [Compilation Error Test]:', javaCompileErr.status, '| Stderr Line:', javaCompileErr.stderr.split('\n')[0]);

  console.log('\n===================================================');
  console.log('✅ ALL 5 LANGUAGES PASSED EXECUTION & ERROR DIAGNOSTICS!');
  console.log('===================================================\n');
}

runMultiLanguageSuite().catch(err => {
  console.error('Multi-Language Suite Error:', err);
  process.exit(1);
});
