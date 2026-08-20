async function testOutput() {
  const tests = [
    {
      name: "TEST 1: SyntaxError (Missing Colon)",
      language: "python",
      code: `def greet(name)\n    print("Hello", name)\n\ngreet("Pooja")`
    },
    {
      name: "TEST 2: NameError (Undefined Variable)",
      language: "python",
      code: `name = "Pooja"\nprint(username)`
    },
    {
      name: "TEST 3: KeyError (Missing Dict Key)",
      language: "python",
      code: `employee = {"name": "Rahul", "basic": 30000, "bonus": 3000}\nprint(employee["allowance"])`
    },
    {
      name: "TEST 4: TypeError (Int + Dict)",
      language: "python",
      code: `total = 100\nvalue = {"price": 50}\ntotal += value\nprint(f"Total: {total}")`
    },
    {
      name: "TEST 5: Valid Program (No Error)",
      language: "python",
      code: `print("CodeForge AI Universal Engine Output Verified!")`
    }
  ];

  console.log("===================================================");
  console.log("🚀 LIVE CODEFORGE AI AUTO-FIX OUTPUT VERIFICATION");
  console.log("===================================================\n");

  for (const t of tests) {
    console.log(`📌 ${t.name}`);
    console.log("--- INPUT CODE ---");
    console.log(t.code);

    try {
      const res = await globalThis.fetch("http://localhost:5000/api/debug/auto-fix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: t.language, code: t.code })
      });
      const data: any = await res.json();
      console.log("\n--- RESULT ---");
      console.log("Success:", data.success);
      console.log("Reason Code:", data.reasonCode || 'SUCCESS');
      console.log("Attempts:", data.attempts);
      console.log("Final Output:\n" + (data.output || data.stdout || '(No Output)'));
      console.log("Fixed Code:\n" + (data.fixedCode || data.finalCode || t.code));
      console.log("---------------------------------------------------\n");
    } catch (err: any) {
      console.error("API Call Error:", err.message);
    }
  }
}

testOutput();
