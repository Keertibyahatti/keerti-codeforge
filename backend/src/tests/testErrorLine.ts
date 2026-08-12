import http from 'http';

const incompleteFactorialCode = `# CodeForge AI — Python Runner
def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 

num = 5
print(f"Factorial of {num} is {calculate_factorial(num)}")
`;

const data = JSON.stringify({ language: 'python', code: incompleteFactorialCode });

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/executions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('\n===================================================');
    console.log('🧪 INCOMPLETE EXPRESSION & MISSING OPERAND TEST RESULT');
    console.log('===================================================');
    console.log(JSON.stringify(JSON.parse(body), null, 2));
  });
});

req.write(data);
req.end();
