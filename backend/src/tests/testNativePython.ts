import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const code = `def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")`;

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-py-'));
const filePath = path.join(tempDir, 'main.py');
fs.writeFileSync(filePath, code, 'utf8');

const child = spawn('python', [filePath], { cwd: tempDir, env: { ...process.env, PYTHONUNBUFFERED: '1' } });
let stdout = '';
child.stdout.on('data', d => stdout += d.toString());
child.stdin.write('1\n');
child.stdin.end();
child.on('close', () => {
  console.log('NATIVE STDOUT FOR 1:', JSON.stringify(stdout));
  fs.rmSync(tempDir, { recursive: true, force: true });
});
