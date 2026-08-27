import { PythonExecutor } from '../executors/pythonExecutor';

async function testPythonInput() {
  const executor = new PythonExecutor();
  const studentCode = `name = input("Enter student name: ")
maths = float(input("Enter Maths marks: "))
science = float(input("Enter Science marks: "))

total = maths + science
average = total / 2

if average >= 90:
    grade = "A+"
elif average >= 75:
    grade = "A"
elif average >= 60:
    grade = "B"
elif average >= 40:
    grade = "C"
else:
    grade = "F"

print("\\n--- Student Result ---")
print("Name:", name)
print("Total:", total)
print("Average:", average)
print("Grade:", grade)`;

  console.log("=== TEST 1: User provides NO input (empty input) ===");
  const res1 = await executor.execute({ code: studentCode, input: '' });
  console.log("Exit Code:", res1.exitCode);
  console.log("Stdout:\n", res1.stdout);
  console.log("Stderr:\n", res1.stderr);

  console.log("\n=== TEST 2: User provides partial input ('Keerti') ===");
  const res2 = await executor.execute({ code: studentCode, input: 'Keerti' });
  console.log("Exit Code:", res2.exitCode);
  console.log("Stdout:\n", res2.stdout);
  console.log("Stderr:\n", res2.stderr);

  console.log("\n=== TEST 3: User provides complete float input ('Keerti\\n85.5\\n92.5') ===");
  const res3 = await executor.execute({ code: studentCode, input: 'Keerti\n85.5\n92.5' });
  console.log("Exit Code:", res3.exitCode);
  console.log("Stdout:\n", res3.stdout);
  console.log("Stderr:\n", res3.stderr);
}

testPythonInput().catch(console.error);
