# CodeForge AI — Execution Engine Specification

The **Execution Engine** provides process isolation for multi-language execution.

## Language Executors

1. **Python Executor (`PythonExecutor`)**:
   - Invokes `python main.py` inside a temporary directory.
   - Captures stdout/stderr in unbuffered mode (`PYTHONUNBUFFERED=1`).

2. **JavaScript Executor (`JSExecutor`)**:
   - Invokes `node main.js` with isolated process context.

3. **C Executor (`CExecutor`)**:
   - Step 1: Compiles code using `gcc main.c -o main.exe`.
   - Step 2: Executes compiled binary with input stream.

4. **C++ Executor (`CppExecutor`)**:
   - Step 1: Compiles code using `g++ -std=c++17 main.cpp -o main.exe`.
   - Step 2: Executes compiled binary with input stream.

5. **Java Executor (`JavaExecutor`)**:
   - Step 1: Compiles class using `javac Main.java`.
   - Step 2: Executes class file using `java -cp <dir> Main`.

## Process Guardrails
- **Execution Timeout**: 5 seconds limit per run.
- **Output Limit**: 1024 KB max standard output.
- **File Cleanup**: Temporary folders are force-removed on process exit.
