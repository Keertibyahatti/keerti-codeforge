async function runFinalTest() {
  console.log("===================================================");
  console.log("🚀 TESTING FINAL INTENTIONALLY BROKEN PYTHON PROGRAM");
  console.log("===================================================\n");

  const brokenCode = `name = "Pooja"\nmarks = [85, 78, 92, 88, 90]\naverage = sum(marks) / len(marks)\n\nif average >= 90:\n    grade = "A+"\nelif average >= 80:\n    grade = "A"\nelif average >= 70:\n    grade = "B"\nelse:\n    grade = "C"\n\nprint("Student:", name)\nprint("Marks:)\nprint("Average:", average)\nprint("Grade:", grade)`;

  console.log("--- ORIGINAL BROKEN CODE ---");
  console.log(brokenCode);

  try {
    const res = await globalThis.fetch("http://localhost:5000/api/debug/auto-fix", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "python", code: brokenCode })
    });
    const data: any = await res.json();
    console.log("\n--- RESULT ---");
    console.log("Success:", data.success);
    console.log("Reason Code:", data.reasonCode || 'SUCCESS');
    console.log("Attempts:", data.attempts);
    console.log("Fixed Code:\n" + data.fixedCode);
    console.log("Final Output:\n" + data.output);

    if (!data.success || !data.output.includes("Student: Pooja") || !data.output.includes("Average: 86.6")) {
      throw new Error(`Final functional test failed! ${JSON.stringify(data)}`);
    }

    console.log("\n✅ FINAL FUNCTIONAL TEST PASSED CLEANLY WITH EXIT CODE 0!");
  } catch (err: any) {
    console.error("Final Test Error:", err.message);
  }
}

runFinalTest();
