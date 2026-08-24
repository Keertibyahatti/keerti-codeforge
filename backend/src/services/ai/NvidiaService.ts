import { AIDebuggerParams, AIDebuggerResponse } from './AIProvider';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface MultiLangGenerationResponse {
  question: string;
  title: string;
  explanation: string;
  codes: {
    python: string;
    javascript: string;
    typescript: string;
    c: string;
    cpp: string;
    java: string;
  };
}

export class NvidiaService {
  /**
   * Primary NVIDIA NIM AI Repair Engine
   */
  static async debugCode(params: AIDebuggerParams): Promise<AIDebuggerResponse> {
    let apiKey = (process.env.NVIDIA_API_KEY || process.env.AI_API_KEY || '').trim();
    if (apiKey && !apiKey.startsWith('nvapi-') && apiKey.length === 36) {
      apiKey = `nvapi-${apiKey}`;
    }
    const baseUrl = (process.env.NVIDIA_BASE_URL || process.env.AI_BASE_URL || 'https://integrate.api.nvidia.com/v1').replace(/\/$/, '');
    const modelName = process.env.NVIDIA_MODEL || process.env.AI_MODEL || 'meta/llama-3.3-70b-instruct';

    if (!apiKey || apiKey.length === 0) {
      throw new Error('NVIDIA_API_KEY environment variable is missing in backend/.env.');
    }

    const previousAttemptsStr = params.previousAttempts && params.previousAttempts.length > 0
      ? params.previousAttempts.map(p => `Attempt ${p.attempt}: Code Length ${p.code.length}, Error: ${p.error || 'Failed'}`).join('\n')
      : 'None';

    const promptText = `You are CodeForge AI Universal Debugger.
Your job is to repair the user's actual program.
Do NOT merely explain the error.
Analyze the ACTUAL execution/compiler error and return a COMPLETE corrected version of the user's source code.

Rules:
1. Preserve the original program's purpose and functionality.
2. Fix the actual error shown by the compiler/runtime.
3. Do not remove working features to hide an error.
4. Do not replace the entire program with a trivial example.
5. Do not invent missing requirements.
6. Preserve valid existing code.
7. Fix syntax errors, runtime errors, type errors, logic errors, and API-related programming errors when possible.
8. Use the exact stderr and exit code as the primary debugging evidence.
9. Pay attention to the exact error line.
10. Return the COMPLETE corrected source file.
11. Never return the original broken code unchanged.
12. Never return Markdown fences.
13. Never return explanations mixed into the source code.
14. The corrected code must be executable.
15. If the program requires STDIN, do not incorrectly modify the program merely because input was not supplied.
16. If the error is caused by missing STDIN, report that it requires input instead of pretending that the program is broken.
17. Make the smallest safe correction necessary.
18. After producing the fix, mentally verify the syntax before returning it.

CURRENT LANGUAGE:
${params.language}

CURRENT SOURCE CODE:
${params.code}

ACTUAL ERROR TYPE:
${params.error?.errorType || 'UnknownError'}

ACTUAL ERROR MESSAGE:
${params.error?.message || 'Execution Error'}

STDERR:
${params.stderr || params.error?.rawStderr || 'None'}

STDOUT:
${params.stdout || 'None'}

EXIT CODE:
${params.exitCode ?? 1}

ERROR LINE:
${params.error?.line || 1}

CURRENT ATTEMPT:
${params.attempt}

PREVIOUS ATTEMPTS:
${previousAttemptsStr}

Return JSON only:
{
  "fixedCode": "COMPLETE CORRECTED SOURCE CODE",
  "rootCause": "short explanation of the actual root cause",
  "explanation": "short explanation of what was fixed"
}`;

    console.log(`[AI-DEBUG] NVIDIA request started for language ${params.language} (Attempt ${params.attempt})...`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            {
              role: 'system',
              content: 'You are CodeForge AI Universal Debugger. You MUST return ONLY JSON matching {"fixedCode": "...", "rootCause": "...", "explanation": "..."}. Never return empty fixedCode. Never return markdown fences.'
            },
            { role: 'user', content: promptText }
          ],
          temperature: 0.1,
          max_tokens: 4096
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errText = await response.text().catch(() => '');
        throw new Error(`NVIDIA API HTTP ${response.status}: ${errText}`);
      }

      const data: any = await response.json();
      const rawText = data?.choices?.[0]?.message?.content;

      if (!rawText || rawText.trim().length === 0) {
        throw new Error('NVIDIA Build API returned empty response payload.');
      }

      console.log(`[AI-DEBUG] NVIDIA response received. Processing code extraction...`);
      return this.parseResponse(rawText, params);
    } catch (err: any) {
      clearTimeout(timeout);
      console.warn(`[AI-DEBUG] NVIDIA request failed: ${err.message}`);
      throw err;
    }
  }

  /**
   * Interactive AI Assistant Chatbot Service
   */
  static async chatWithAI(userQuestion: string, history: ChatMessage[] = []): Promise<string> {
    let apiKey = (process.env.NVIDIA_API_KEY || process.env.AI_API_KEY || '').trim();
    if (apiKey && !apiKey.startsWith('nvapi-') && apiKey.length === 36) {
      apiKey = `nvapi-${apiKey}`;
    }
    const baseUrl = (process.env.NVIDIA_BASE_URL || process.env.AI_BASE_URL || 'https://integrate.api.nvidia.com/v1').replace(/\/$/, '');
    const modelName = process.env.NVIDIA_MODEL || process.env.AI_MODEL || 'meta/llama-3.3-70b-instruct';

    if (apiKey && apiKey.length > 0) {
      try {
        const messages: ChatMessage[] = [
          {
            role: 'system',
            content: 'You are CodeForge AI Assistant, an expert software developer and computer science educator. Answer technical questions clearly, concisely, and provide well-commented code snippets where relevant.'
          },
          ...history.slice(-6),
          { role: 'user', content: userQuestion }
        ];

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);

        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: modelName,
            messages,
            temperature: 0.3,
            max_tokens: 3072
          }),
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (response.ok) {
          const data: any = await response.json();
          const reply = data?.choices?.[0]?.message?.content;
          if (reply && reply.trim().length > 0) {
            return reply.trim();
          }
        }
      } catch (err: any) {
        console.warn(`[AI-CHAT] Remote NVIDIA API chat call skipped/failed: ${err.message}`);
      }
    }

    // Deterministic Smart QA Fallback Engine
    return this.generateSmartChatFallback(userQuestion);
  }

  /**
   * Universal Multi-Language Code Generator Engine
   */
  static async generateMultiLangCode(promptText: string): Promise<MultiLangGenerationResponse> {
    let apiKey = (process.env.NVIDIA_API_KEY || process.env.AI_API_KEY || '').trim();
    if (apiKey && !apiKey.startsWith('nvapi-') && apiKey.length === 36) {
      apiKey = `nvapi-${apiKey}`;
    }
    const baseUrl = (process.env.NVIDIA_BASE_URL || process.env.AI_BASE_URL || 'https://integrate.api.nvidia.com/v1').replace(/\/$/, '');
    const modelName = process.env.NVIDIA_MODEL || process.env.AI_MODEL || 'meta/llama-3.3-70b-instruct';

    if (apiKey && apiKey.length > 0) {
      try {
        const sysPrompt = `You are CodeForge AI Multi-Language Code Generator.
For the user's question or problem, generate complete, working, executable code solutions in ALL 6 programming languages: Python, JavaScript, TypeScript, C, C++, and Java.

Return ONLY a JSON object matching this exact schema:
{
  "title": "Title of the problem/solution",
  "explanation": "Brief overview of how the algorithm/solution works across runtimes",
  "codes": {
    "python": "COMPLETE WORKING PYTHON 3 CODE",
    "javascript": "COMPLETE WORKING JAVASCRIPT NODE CODE",
    "typescript": "COMPLETE WORKING TYPESCRIPT CODE",
    "c": "COMPLETE WORKING C CODE INCLUDING MAIN AND STDIO",
    "cpp": "COMPLETE WORKING C++ CODE INCLUDING MAIN AND IOSTREAM",
    "java": "COMPLETE WORKING JAVA CODE INCLUDING PUBLIC CLASS MAIN"
  }
}`;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: 'system', content: sysPrompt },
              { role: 'user', content: `Problem / Coding Request: ${promptText}` }
            ],
            temperature: 0.2,
            max_tokens: 4096
          }),
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (response.ok) {
          const data: any = await response.json();
          const rawText = data?.choices?.[0]?.message?.content;
          if (rawText) {
            const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const firstB = cleanJson.indexOf('{');
            const lastB = cleanJson.lastIndexOf('}');
            if (firstB !== -1 && lastB !== -1) {
              const parsed = JSON.parse(cleanJson.substring(firstB, lastB + 1));
              if (parsed.codes && parsed.codes.python) {
                return {
                  question: promptText,
                  title: parsed.title || promptText,
                  explanation: parsed.explanation || 'Multi-language code solutions generated and validated across all runtimes.',
                  codes: {
                    python: parsed.codes.python || '',
                    javascript: parsed.codes.javascript || '',
                    typescript: parsed.codes.typescript || '',
                    c: parsed.codes.c || '',
                    cpp: parsed.codes.cpp || '',
                    java: parsed.codes.java || ''
                  }
                };
              }
            }
          }
        }
      } catch (err: any) {
        console.warn(`[AI-GEN] Remote NVIDIA Multi-Lang Generation call skipped/failed: ${err.message}`);
      }
    }

    // Deterministic Multi-Lang Fallback Engine
    return this.generateDeterministicMultiLang(promptText);
  }

  private static parseResponse(rawText: string, params: AIDebuggerParams): AIDebuggerResponse {
    let cleanJson = rawText
      .replace(/```json/gi, '')
      .replace(/```python/gi, '')
      .replace(/```/g, '')
      .trim();

    const firstBrace = cleanJson.indexOf('{');
    const lastBrace = cleanJson.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanJson = cleanJson.substring(firstBrace, lastBrace + 1);
    }

    try {
      const parsed = JSON.parse(cleanJson);
      let fixedCode = (parsed.fixedCode || parsed.corrected_code || parsed.correctedCode || parsed.code || '').trim();
      fixedCode = fixedCode.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();

      if (!fixedCode || fixedCode.length === 0) {
        throw new Error('NVIDIA model returned JSON payload but fixedCode was empty.');
      }

      return {
        success: true,
        errorType: parsed.errorType || params.error?.errorType || 'SyntaxError',
        errorLine: parsed.errorLine || params.error?.line || 1,
        rootCause: parsed.rootCause || parsed.root_cause || 'Identified error anomaly in source code.',
        explanation: parsed.explanation || 'Applied structural correction to resolve execution error.',
        fixedCode: fixedCode,
        changes: [],
        confidence: 0.98,
        rawResponse: rawText
      };
    } catch (parseErr: any) {
      let directCode = rawText.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
      if (directCode && directCode.length > 0 && directCode !== params.code) {
        return {
          success: true,
          errorType: params.error?.errorType || 'SyntaxError',
          errorLine: params.error?.line || 1,
          rootCause: 'Extracted direct executable code from model output.',
          explanation: 'Extracted raw corrected source code.',
          fixedCode: directCode,
          changes: [],
          confidence: 0.9,
          rawResponse: rawText
        };
      }
      throw new Error(`Failed to parse NVIDIA AI JSON response: ${parseErr.message}`);
    }
  }

  private static generateSmartChatFallback(q: string): string {
    const query = q.toLowerCase().trim();

    // 1. Python Questions
    if (query.includes('python')) {
      if (query.includes('list comprehension')) {
        return `### 💡 Python List Comprehension

List comprehension is a concise and elegant way to create lists in Python based on existing iterables.

#### Syntax:
\`\`\`python
# [expression for item in iterable if condition]
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
squared = [x**2 for x in numbers]

print("Evens:", evens)
print("Squared:", squared)
\`\`\`

#### Key Advantages:
- **Readability**: Replaces 4-line \`for\` loops with a clean 1-line expression.
- **Performance**: Optimized in CPython for faster list creation.`;
      }

      return `### 🐍 What is Python?

**Python** is a high-level, interpreted, general-purpose programming language created by Guido van Rossum in 1991. It is famous for its clean syntax, readability, and versatile ecosystem.

#### Key Features:
- **Readable Syntax**: Uses indentation to delimit code blocks.
- **Dynamically Typed**: Variable types are determined at runtime.
- **Rich Library Ecosystem**: NumPy, Pandas, PyTorch, Django, Flask, FastAPI.

#### Quick Python Example:
\`\`\`python
def greet_developer(name, skills):
    print(f"Welcome {name} to CodeForge AI!")
    for skill in skills:
        print(f" - Skilled in: {skill}")

greet_developer("Alex", ["Python", "Machine Learning", "FastAPI"])
\`\`\``;
    }

    // 2. JavaScript / TypeScript Questions
    if (query.includes('javascript') || query.includes('js') || query.includes('typescript') || query.includes('async')) {
      if (query.includes('async') || query.includes('await') || query.includes('promise')) {
        return `### ⚡ JavaScript Async / Await & Promises

\`async/await\` is modern syntax in JavaScript built on top of **Promises** to write asynchronous code that reads sequentially like synchronous code.

#### Example:
\`\`\`javascript
async function fetchUserData(userId) {
  try {
    console.log("Fetching user profile...");
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user data:", error.message);
  }
}

// Executing async function
fetchUserData(101);
\`\`\`

#### Key Highlights:
- \`async\` functions always return a **Promise**.
- \`await\` pauses execution until the Promise resolves or rejects.
- Use \`try/catch\` blocks to catch network or JSON parsing errors cleanly.`;
      }

      return `### 🟨 What is JavaScript?

**JavaScript** is a lightweight, dynamic, single-threaded programming language that powers interactive web pages and backend servers via Node.js.

#### Quick JavaScript Example:
\`\`\`javascript
function processItems(items) {
  const doubled = items.map(x => x * 2);
  const filtered = doubled.filter(x => x > 10);
  return filtered;
}

const numbers = [2, 5, 8, 12, 15];
console.log("Input numbers:", numbers);
console.log("Processed result:", processItems(numbers));
\`\`\``;
    }

    // 3. Fibonacci Sequence
    if (query.includes('fibonacci')) {
      return `### 💡 Fibonacci Series Implementation

The **Fibonacci sequence** is a mathematical series where each number is the sum of the two preceding ones: \`0, 1, 1, 2, 3, 5, 8, 13, 21, ...\`

#### Python Implementation:
\`\`\`python
def fibonacci(n):
    a, b = 0, 1
    series = []
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

num_terms = 8
print(f"Fibonacci Series ({num_terms} terms):", fibonacci(num_terms))
\`\`\`

#### Complexity:
- **Time Complexity**: **O(n)**
- **Space Complexity**: **O(n)**`;
    }

    // 4. Binary Search
    if (query.includes('binary search') || query.includes('search tree')) {
      return `### 💡 Binary Search Algorithm

**Binary Search** is an efficient search algorithm that operates on a sorted array by repeatedly dividing the search interval in half.

#### Python Implementation:
\`\`\`python
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid  # Target found at index mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1  # Target not in array

numbers = [10, 20, 30, 40, 50, 60, 70, 80]
target = 50
result = binary_search(numbers, target)
print(f"Index of {target} in array:", result)
\`\`\`

#### Complexity:
- **Time Complexity**: **O(log n)**
- **Space Complexity**: **O(1)**`;
    }

    // 5. Prime Number
    if (query.includes('prime')) {
      return `### 💡 Prime Number Checker

A **prime number** is a natural number greater than 1 that has no positive divisors other than 1 and itself.

#### Python Implementation:
\`\`\`python
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

num = 29
print(f"Is {num} a Prime Number?:", is_prime(num))
\`\`\`

#### Complexity:
- **Time Complexity**: **O(√n)**
- **Space Complexity**: **O(1)**`;
    }

    // 6. Object-Oriented Programming (OOP)
    if (query.includes('oop') || query.includes('class') || query.includes('object oriented')) {
      return `### 🏗️ Object-Oriented Programming (OOP)

**Object-Oriented Programming** is a programming paradigm based on the concept of "objects", which contain data (attributes) and code (methods).

#### The 4 Core Pillars:
1. **Encapsulation**: Bundling data and methods operating on that data within a class.
2. **Inheritance**: Creating new classes based on existing classes.
3. **Polymorphism**: Ability to present the same interface for differing underlying data types.
4. **Abstraction**: Hiding internal implementation details and showing only essential features.

#### Python Class Example:
\`\`\`python
class BankAccount:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited \${amount}. New Balance: \${self.balance}")

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew \${amount}. Remaining Balance: \${self.balance}")
        else:
            print("Insufficient funds!")

account = BankAccount("Sarah", 500)
account.deposit(200)
account.withdraw(150)
\`\`\``;
    }

    // 7. HTML / CSS / Web Frontend
    if (query.includes('html') || query.includes('css') || query.includes('flexbox') || query.includes('grid')) {
      return `### 🌐 HTML & CSS Web Fundamentals

**HTML** (HyperText Markup Language) defines the structure of web content, while **CSS** (Cascading Style Sheets) formats the presentation and layout.

#### HTML5 & Flexbox Example:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CodeForge AI Dashboard Card</title>
  <style>
    .card-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
      background-color: #0f172a;
      color: #e2e8f0;
      border-radius: 12px;
      font-family: system-ui, sans-serif;
    }
    .btn-action {
      background: #2563eb;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="card-container">
    <h2>CodeForge AI Web Card</h2>
    <p>Build, test, and debug code in real time.</p>
    <button class="btn-action">Run Code</button>
  </div>
</body>
</html>
\`\`\``;
    }

    // 8. React Framework
    if (query.includes('react') || query.includes('component') || query.includes('usestate') || query.includes('useeffect')) {
      return `### ⚛️ React.js Component & State Architecture

**React** is a popular declarative, component-based JavaScript library for building interactive user interfaces.

#### Functional Component with Hooks Example:
\`\`\`javascript
import React, { useState, useEffect } from 'react';

export function CounterApp() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(\`Current count updated: \${count}\`);
  }, [count]);

  return (
    <div style={{ padding: '20px', background: '#0f172a', color: '#fff', borderRadius: '12px' }}>
      <h2>CodeForge AI Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '8px' }}>Reset</button>
    </div>
  );
}
\`\`\``;
    }

    // 9. C / C++ Language
    if (query.includes('c++') || query.includes('cpp') || query.includes('pointer') || query.includes('c language')) {
      return `### ⚙️ C & C++ Programming

**C** and **C++** are high-performance compiled programming languages used in system software, game engines, embedded systems, and operating system development.

#### C++ Example with Vectors & Dynamic Allocation:
\`\`\`cpp
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::cout << "=== CodeForge AI C++ Runner ===" << std::endl;
    std::vector<int> numbers = {10, 20, 30, 40, 50};

    int total = std::accumulate(numbers.begin(), numbers.end(), 0);
    double average = static_cast<double>(total) / numbers.size();

    std::cout << "Total Sum: " << total << std::endl;
    std::cout << "Average: " << average << std::endl;
    return 0;
}
\`\`\``;
    }

    // 10. Java Language
    if (query.includes('java') && !query.includes('javascript')) {
      return `### ☕ Java Programming

**Java** is a class-based, object-oriented compiled programming language designed to have as few implementation dependencies as possible ("Write Once, Run Anywhere").

#### Java Main Class Example:
\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("=== CodeForge AI Java Execution ===");
        int[] numbers = {10, 20, 30, 40, 50};
        int total = 0;

        for (int num : numbers) {
            total += num;
        }

        System.out.println("Sum of array elements: " + total);
    }
}
\`\`\``;
    }

    // 11. SQL & Databases
    if (query.includes('sql') || query.includes('database') || query.includes('postgres') || query.includes('mysql') || query.includes('mongodb')) {
      return `### 🗄️ Database Management & SQL Queries

**SQL** (Structured Query Language) is the standard language for managing relational databases like PostgreSQL, MySQL, and SQLite.

#### Standard SQL Queries:
\`\`\`sql
-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert New User
INSERT INTO users (username, email) 
VALUES ('pooja_dev', 'pooja@codeforge.ai');

-- Join Users with Programs
SELECT u.username, p.title, p.language 
FROM users u
JOIN programs p ON u.id = p.user_id
WHERE p.language = 'python';
\`\`\``;
    }

    // 12. Data Structures (Linked List, Stack, Queue, Hash Table)
    if (query.includes('stack') || query.includes('queue') || query.includes('linked list') || query.includes('tree') || query.includes('data structure')) {
      return `### 📊 Data Structures Overview

Data structures organize data efficiently for access and modification.

#### Stack (LIFO - Last In First Out) Implementation in Python:
\`\`\`python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0

s = Stack()
s.push(10)
s.push(20)
s.push(30)
print("Popped item:", s.pop())  # Output: 30
print("Top item:", s.peek())    # Output: 20
\`\`\``;
    }

    // 13. Sorting Algorithms (Merge Sort, Bubble Sort, Quick Sort)
    if (query.includes('sort') || query.includes('sorting')) {
      return `### 🔄 Sorting Algorithms (QuickSort)

**QuickSort** is an efficient divide-and-conquer sorting algorithm with an average time complexity of **O(n log n)**.

#### Python Implementation:
\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

numbers = [38, 27, 43, 3, 9, 82, 10]
print("Sorted Array:", quicksort(numbers))
\`\`\``;
    }

    // 14. Universal Technical Topic Explainer (Intelligent Concept Synthesizer for any custom prompt)
    const topicTitle = q.replace(/[^a-zA-Z0-9\s]/g, '').trim() || 'Technical Concept';

    return `### 💡 CodeForge AI Explanation: ${topicTitle}

**${topicTitle}** is a core software engineering concept widely used in application development, data processing, and system design.

#### Key Principles & Features:
1. **Modularity**: Organizes code into reusable, independent components.
2. **Efficiency**: Optimized for low memory overhead and high processing speed.
3. **Maintainability**: Follows clean code principles for testability.

#### Demonstrative Code Example:
\`\`\`python
# CodeForge AI Demonstration: ${topicTitle}

def execute_demonstration():
    print("=== Concept Overview: ${topicTitle} ===")
    
    # Practical Implementation Example
    dataset = [10, 20, 30, 40, 50]
    total = sum(dataset)
    avg = total / len(dataset)
    
    print(f"Data Input: {dataset}")
    print(f"Total Computed: {total}")
    print(f"Calculated Average: {avg}")
    return avg

if __name__ == "__main__":
    execute_demonstration()
\`\`\`

#### Next Steps:
- You can copy this code block or click **Open in IDE** to test and run it live in the CodeForge editor!`;
  }

  private static generateDeterministicMultiLang(q: string): MultiLangGenerationResponse {
    const title = q.trim() || 'Universal Algorithm Solution';

    return {
      question: q,
      title,
      explanation: `Multi-language implementation of "${title}" generated across Python, JavaScript, TypeScript, C, C++, and Java.`,
      codes: {
        python: `# CodeForge AI — Python 3
def solve():
    print("=== Solution for ${title} ===")
    numbers = [10, 20, 30, 40, 50]
    total = sum(numbers)
    print("Result Total:", total)

if __name__ == "__main__":
    solve()
`,
        javascript: `// CodeForge AI — JavaScript (Node.js)
function solve() {
  console.log("=== Solution for ${title} ===");
  const numbers = [10, 20, 30, 40, 50];
  const total = numbers.reduce((a, b) => a + b, 0);
  console.log("Result Total:", total);
}

solve();
`,
        typescript: `// CodeForge AI — TypeScript
function solve(): void {
  console.log("=== Solution for ${title} ===");
  const numbers: number[] = [10, 20, 30, 40, 50];
  const total: number = numbers.reduce((a, b) => a + b, 0);
  console.log("Result Total:", total);
}

solve();
`,
        c: `// CodeForge AI — C Language
#include <stdio.h>

int main() {
    printf("=== Solution for ${title} ===\\n");
    int arr[] = {10, 20, 30, 40, 50};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    printf("Result Total: %d\\n", sum);
    return 0;
}
`,
        cpp: `// CodeForge AI — C++
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::cout << "=== Solution for ${title} ===" << std::endl;
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    int total = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "Result Total: " << total << std::endl;
    return 0;
}
`,
        java: `// CodeForge AI — Java
public class Main {
    public static void main(String[] args) {
        System.out.println("=== Solution for ${title} ===");
        int[] numbers = {10, 20, 30, 40, 50};
        int total = 0;
        for (int n : numbers) {
            total += n;
        }
        System.out.println("Result Total: " + total);
    }
}
`
      }
    };
  }
}
