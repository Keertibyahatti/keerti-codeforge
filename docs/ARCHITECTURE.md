# CodeForge AI — System Architecture & Design Specification

CodeForge AI employs a 3-tier full-stack monorepo architecture:

## 1. Presentation Layer (Frontend)
- Built with React 19, TypeScript, and Vite.
- Styled using Tailwind CSS for a modern developer UI.
- Integrated with Microsoft's Monaco Editor for code input, syntax highlighting, and autocomplete.
- State management via React Context (`AuthContext`) and custom hooks.

## 2. Application & Logic Layer (Backend API)
- Built with Express and Node.js in TypeScript.
- RESTful JSON API structure divided into modular controllers, services, middleware, and executors.
- Enforces JWT authentication (`jsonwebtoken`) and password security (`bcryptjs`).
- Contains the **Language Executor Architecture** and **AI Diagnostic Engine**.

## 3. Data Layer (Database & ORM)
- Database management handled by Prisma ORM.
- Supports both SQLite (zero-config local development) and PostgreSQL (production).
- Database models: `User`, `Program`, `CodeVersion`, `Execution`, `AIAnalysis`.

## 4. Execution Sandbox Security
- All execution requests are routed through dedicated language executor classes (`PythonExecutor`, `JSExecutor`, `CExecutor`, `CppExecutor`, `JavaExecutor`).
- Safety rules:
  1. Maximum process execution timeout (5000ms).
  2. Output buffer limitation (1024 KB max stdout/stderr).
  3. Temporary isolated execution directories deleted immediately after process exit.
  4. Sanitized process invocation avoiding shell injection vulnerabilities.
