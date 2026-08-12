# CodeForge AI — Intelligent Web-Based Code Editor

**CodeForge AI** is a real-time full-stack web application designed as a major/final-year project. It features multi-language execution (Python, JavaScript, C, C++, Java), an interactive Monaco editor workspace, real-time output & error logs, AI-assisted error explanation and code fixing, automated code optimization, code version history, and execution audit logging.

---

## 🚀 Key Features

* **Multi-Language Sandbox Execution**: Run Python, JavaScript (Node.js), C (GCC), C++ (G++), and Java programs directly from your browser.
* **Monaco VS-Code Editor**: Full syntax highlighting, line numbers, autocomplete, starter templates, and code formatting.
* **AI Diagnostic & Optimization Engine**:
  * Detects syntax errors, compilation failures, and runtime tracebacks.
  * Provides beginner-friendly explanations and root-cause breakdowns.
  * 1-click "Apply Fix" to update code in the editor.
  * Code refactoring and algorithmic time/space complexity optimization.
* **User Authentication & Dashboard**: Secure JWT-based authentication with bcrypt password hashing.
* **Code & Version History**: Save programs and track full version snapshot histories.
* **Execution Audit Logs**: View execution logs, process execution timing, and exit codes.
* **Sandboxed Security**: Enforces 5-second process execution limits, 1MB stdout buffer caps, and temporary file sanitization.

---

## 🛠️ Technology Stack

* **Frontend**: React 19, TypeScript, Vite, Monaco Editor (`@monaco-editor/react`), React Router, Tailwind CSS, Lucide Icons
* **Backend**: Node.js, Express, TypeScript, JWT (`jsonwebtoken`), `bcryptjs`, Zod
* **Database**: Prisma ORM with SQLite (default zero-config local setup) or PostgreSQL (configured via `.env`)
* **Execution Infrastructure**: Process-level isolated language runtimes (`python`, `node`, `gcc`, `g++`, `javac`/`java`)

---

## 📦 Project Structure

```text
codeforge-ai/
├── frontend/             # React + Vite + Monaco Editor Frontend Application
│   ├── src/
│   │   ├── components/   # Navbar, Sidebar, MonacoEditorPanel, ConsolePanel, AIPanel
│   │   ├── pages/        # Landing, Register, Login, Dashboard, Editor, History, Executions, Profile
│   │   ├── context/      # AuthContext for session management
│   │   ├── services/     # Axios API client
│   │   └── types/        # TypeScript interfaces
├── backend/              # Node.js + Express + Prisma API & Execution Engine
│   ├── src/
│   │   ├── controllers/  # Auth, Program, Execution, AI controllers
│   │   ├── executors/    # Python, JS, C, C++, Java language executors
│   │   ├── middleware/   # JWT auth & error handler
│   │   ├── routes/       # API endpoints
│   │   └── services/     # AI service & Gemini API client
│   └── prisma/           # Database schema & seed script
├── docs/                 # Architecture & API documentation
├── docker-compose.yml    # Optional PostgreSQL Docker service
├── .env.example          # Environment variables template
├── README.md             # Project setup guide
└── package.json          # Root workspace scripts
```

---

## 💻 Quick Start & VS Code Instructions

### 1. Prerequisites
Ensure you have installed:
* **Node.js**: v18+ or v20+ (Node v24 supported)
* **npm**: v9+ or v10+
* **Language Runtimes** (for local code execution):
  * Python (`python` or `python3` in system PATH)
  * Node.js (`node` in system PATH)
  * GCC / G++ (`gcc` / `g++` for C and C++)
  * Java Development Kit (`javac` and `java` for Java)

### 2. Installation & Setup Steps (Windows PowerShell / VS Code)

Open VS Code terminal in the project directory (`codeforge keerti`) and run:

```powershell
# 1. Install root, backend, and frontend dependencies
npm run setup
```

The `npm run setup` command automatically installs all packages, runs Prisma database migrations (`dev.db`), and seeds initial sample programs.

### 3. Run Development Servers

Start both Backend API (`http://localhost:5000`) and Frontend (`http://localhost:5173`) concurrently:

```powershell
npm run dev
```

Open your browser and navigate to **`http://localhost:5173`**.

---

## 🧪 Testing the Complete Application Flow

1. Open `http://localhost:5173/` in your browser.
2. Click **Start Coding** or **Register**.
3. Create a new account or sign in using sample credentials:
   * **Email**: `demo@codeforge.ai`
   * **Password**: `demo123456`
4. On the **Dashboard**, click **New Program** or **Launch Code Editor**.
5. Select **Python**, write `print("Hello CodeForge AI")`, and click **Run Code**.
6. Introduce an intentional syntax error (e.g. `if True print("Error")` without a colon) and click **Run Code**.
7. Click **AI Analyze** to view beginner explanations and click **Apply Fix**!
8. Click **Save** to persist the program in your account.
9. Visit **My Programs** and **Execution Logs** to verify version control and audit logs.

---

## 🔑 Environment Variables

To configure an API key for Google Gemini AI or customize ports, edit `backend/.env`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET="codeforge_ai_super_secret_jwt_key_2026"
JWT_EXPIRES_IN="7d"

# Optional Gemini API key
AI_API_KEY=""
AI_MODEL="gemini-2.5-flash"
```

*Note: If `AI_API_KEY` is omitted, CodeForge AI automatically uses its built-in smart diagnostic fallback engine to provide detailed structured feedback without failing.*

---

## 📄 License & Major Project Status

Developed for college major project submission. Full-stack architecture validated for production presentation.
