# CodeForge AI — Intelligent Code Execution, Error Detection & Debugging Platform

CodeForge AI is a complete, professional, web-based coding platform featuring multi-language execution, AI-assisted error detection, automatic code fixing, iterative re-debugging, SAST security analysis, unit test generation, performance profiling, and a 0–100 Production Readiness Index.

---

## 🌟 Key Features

1. **Multi-Language Execution Engine**: Run complete programs in **Python 3**, **JavaScript (Node.js)**, **TypeScript**, **C (GCC)**, **C++ (G++)**, and **Java**.
2. **Interactive Stdin Stream**: Live terminal stdin prompt interleaving allowing sequential user input entries (`input()`, `readline`).
3. **AI Error Detection & Beginner Explanations**: Detects exact error lines, exception types (`ZeroDivisionError`, `NameError`, `SyntaxError`), and provides beginner-friendly explanations ("What happened?", "Why it happened?", "How to fix it?").
4. **Auto Fix & Verified Re-Run**: One-click automatic code repair that applies candidate fixes to Monaco Editor, re-executes in backend process, and verifies success with `✅ FIX VERIFIED`.
5. **Iterative Re-Debug (Up to 5 Attempts)**: Advanced re-debugging workflow executing up to 5 safe fix cycles until Exit Code is 0 or max attempts are reached.
6. **Code Diff View & Restore Original**: Visual before/after diff comparison with one-click "Restore Original Code" button.
7. **Demo Examples Selector**: Ready-to-use demo programs for Python (Factorial, Fibonacci, Prime Number, Palindrome, Calculator), JavaScript, Java, C, and C++.
8. **Test Cases System**: Add custom test cases (Input, Expected Output) and click "Run All Test Cases" to inspect `PASS`/`FAIL`/`ERROR` metrics.
9. **SAST Security Center**: Scans code for command injection, unsafe `eval()`, hardcoded credentials, and zero-division risks with actionable security patches.
10. **Performance Intelligence**: Profiling execution duration, memory footprint, and algorithm time complexity ($O(n \log n)$).
11. **Production Readiness Index (0–100)**: Evaluates project readiness across Security, Testing, Reliability, Performance, Architecture, Maintainability, Documentation, Observability, and Deployment.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript, TailwindCSS, Monaco Editor (`@monaco-editor/react`), Lucide Icons, React Router.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, SQLite / PostgreSQL, Child-Process execution handles.
- **AI Integration**: Google Gemini 2.5 Flash API with offline structural fallback repair algorithms.

---

## 🚀 Beginner Quick-Start Instructions

### Step 1: Clone & Setup
```bash
# Navigate to repository
cd "c:\Users\USER\Desktop\codeforge keerti"

# Install all dependencies & push database schema
npm run setup
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env` inside `backend/`:
```ini
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="codeforge_ai_super_secret_jwt_key_2026"
AI_API_KEY=""
AI_MODEL="gemini-2.5-flash"
```

### Step 3: Run Backend API Server
```bash
cd backend
npm run dev
# Server running at http://localhost:5000
```

### Step 4: Run Frontend Web Application
```bash
cd frontend
npm run dev
# Web application running at http://localhost:5173
```

### Step 5: Run Comprehensive E2E System Test Suite (15 Tests)
```bash
cd backend
npm run test
```

---

## 🧪 Comprehensive Test Suite Verification

All 15 E2E tests pass with Exit Code 0:
- Test 1: Clean Python code execution
- Test 2: ZeroDivisionError detection
- Test 3: Stdin input processing ("Pooja")
- Test 4: Multi-line stdin inputs (10 and 20 -> 30)
- Test 5: NameError detection
- Test 6: AI Auto-Fix & Verified Re-Run
- Test 7: Fix verification failure handling
- Test 8: Process limit timeout (5000ms cap)
- Test 9: User stop execution process
- Test 10: Student Calculator
- Test 11: Number Calculator
- Test 12: JavaScript Readline Calculator
- Test 13: Console Reset & Job Isolation
- Test 14: Employee Salary Calculator
- Test 15: Student Grade Calculator Phase 39 Acceptance Test

---

## 🎥 Final Demonstration Flow (Feature 24)

1. Open CodeForge AI at [http://localhost:5173/editor](http://localhost:5173/editor).
2. Select **Python 3** and choose **"Factorial Calculator"** from the **Load Example** dropdown.
3. Introduce an intentional error (e.g., cut function call to `calculate_factor`).
4. Click **Run** -> Output displays detected error.
5. Click **AI Debug** -> Beginner-friendly explanation appears.
6. Click **AI Fix & Auto Re-Run** -> Code diff modal displays before/after changes.
7. Click **Apply Fix & Re-Run** -> System updates code, re-executes, and displays `✅ FIX VERIFIED`.
8. Enter input `5` in terminal -> Final complete output `Factorial of 5 is 120`.
9. Click **Save** -> View saved program on Dashboard & Execution History.
