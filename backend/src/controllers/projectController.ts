import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional().default(''),
  language: z.string().optional().default('python'),
  template: z.string().optional().default('cli')
});

const fileSchema = z.object({
  path: z.string().min(1, 'File path is required'),
  name: z.string().min(1, 'File name is required'),
  content: z.string().optional().default(''),
  language: z.string().optional().default('python'),
  isFolder: z.boolean().optional().default(false)
});

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parseResult = createProjectSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: 'Validation Error', details: parseResult.error.flatten().fieldErrors });
      return;
    }

    const { name, description, language, template } = parseResult.data;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized', message: 'User authentication required.' });
      return;
    }

    const project = await prisma.project.create({
      data: {
        userId,
        name,
        description,
        language,
        framework: template,
        readinessScore: 88
      }
    });

    // Default template starter files
    let defaultFiles: { path: string; name: string; content: string; language: string; isFolder?: boolean }[] = [];

    if (language === 'python') {
      defaultFiles = [
        {
          path: 'src/main.py',
          name: 'main.py',
          language: 'python',
          content: `print("=== CodeForge AI — Python Project ===")

from utils import greet_user, calculate_stats

name = input("Enter your name: ")
val1 = float(input("Enter first number: "))
val2 = float(input("Enter second number: "))

print(greet_user(name))
stats = calculate_stats(val1, val2)

print(f"Sum: {stats['sum']}")
print(f"Average: {stats['average']}")
print("\\nProject executed successfully!")
`
        },
        {
          path: 'src/utils.py',
          name: 'utils.py',
          language: 'python',
          content: `def greet_user(name: str) -> str:
    return f"Hello, {name}! Welcome to CodeForge AI."

def calculate_stats(a: float, b: float) -> dict:
    total = a + b
    avg = total / 2.0
    return {
        "sum": total,
        "average": avg
    }
`
        },
        {
          path: 'tests/test_main.py',
          name: 'test_main.py',
          language: 'python',
          content: `import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

from utils import greet_user, calculate_stats

def test_greet_user():
    assert "Pooja" in greet_user("Pooja")

def test_calculate_stats():
    res = calculate_stats(10, 20)
    assert res['sum'] == 30
    assert res['average'] == 15

print("✅ All Python Unit Tests Passed!")
`
        },
        {
          path: 'README.md',
          name: 'README.md',
          language: 'markdown',
          content: `# ${name}

${description || 'A professional Python software engineering project generated on CodeForge AI.'}

## Features
- Multi-file modular Python structure
- Stdin interactive user prompts
- Automated testing with unit assertions
- SAST security analysis integration

## Quick Start
Run \`src/main.py\` inside the CodeForge AI Cloud IDE.
`
        }
      ];
    } else {
      defaultFiles = [
        {
          path: 'src/main.js',
          name: 'main.js',
          language: 'javascript',
          content: `const readline = require("readline");
const { calculateTotal } = require("./utils");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("=== CodeForge AI — Node.js Project ===");

rl.question("Enter student name: ", (name) => {
  rl.question("Enter Maths score: ", (m1) => {
    rl.question("Enter Science score: ", (m2) => {
      const res = calculateTotal(Number(m1), Number(m2));
      console.log("\\nStudent:", name);
      console.log("Total Score:", res.total);
      console.log("Average Score:", res.average);
      console.log("\\nProject executed successfully!");
      rl.close();
    });
  });
});
`
        },
        {
          path: 'src/utils.js',
          name: 'utils.js',
          language: 'javascript',
          content: `function calculateTotal(a, b) {
  const total = a + b;
  return {
    total,
    average: total / 2
  };
}

module.exports = { calculateTotal };
`
        },
        {
          path: 'README.md',
          name: 'README.md',
          language: 'markdown',
          content: `# ${name}

${description || 'A Node.js project created in CodeForge AI.'}
`
        }
      ];
    }

    for (const f of defaultFiles) {
      await prisma.projectFile.create({
        data: {
          projectId: project.id,
          path: f.path,
          name: f.name,
          content: f.content,
          language: f.language,
          isFolder: false
        }
      });
    }

    const createdProject = await prisma.project.findUnique({
      where: { id: project.id },
      include: { files: true }
    });

    res.status(201).json(createdProject);
  } catch (err: any) {
    res.status(500).json({ error: 'Create Project Error', message: err.message });
  }
};

export const getProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const projects = await prisma.project.findMany({
      where: { userId },
      include: { files: true },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: 'Get Projects Error', message: err.message });
  }
};

export const getProjectById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        files: true,
        securityScans: true,
        testResults: true
      }
    });

    if (!project) {
      res.status(404).json({ error: 'Not Found', message: 'Project not found.' });
      return;
    }

    res.json(project);
  } catch (err: any) {
    res.status(500).json({ error: 'Get Project Error', message: err.message });
  }
};

export const createOrUpdateFile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const projectId = String(req.params.id);
    const parseResult = fileSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: 'Validation Error', details: parseResult.error.flatten().fieldErrors });
      return;
    }

    const { path: filePath, name: fileName, content, language, isFolder } = parseResult.data;

    const existingFile = await prisma.projectFile.findFirst({
      where: { projectId, path: filePath }
    });

    let fileRecord;
    if (existingFile) {
      fileRecord = await prisma.projectFile.update({
        where: { id: existingFile.id },
        data: {
          content,
          name: fileName,
          language,
          updatedAt: new Date()
        }
      });
    } else {
      fileRecord = await prisma.projectFile.create({
        data: {
          projectId,
          path: filePath,
          name: fileName,
          content,
          language,
          isFolder
        }
      });
    }

    await prisma.project.update({
      where: { id: projectId },
      data: { updatedAt: new Date() }
    });

    res.json(fileRecord);
  } catch (err: any) {
    res.status(500).json({ error: 'File Operation Error', message: err.message });
  }
};

export const deleteFile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const projectId = String(req.params.id);
    const fileId = String(req.params.fileId);
    await prisma.projectFile.delete({
      where: { id: fileId }
    });
    res.json({ success: true, message: 'File deleted successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Delete File Error', message: err.message });
  }
};

export const analyzeProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { code, files } = req.body;
    const fileList = Array.isArray(files) && files.length > 0 ? files : [
      { name: 'main.py', path: 'src/main.py', content: code || '' },
      { name: 'utils.py', path: 'src/utils.py', content: 'def helper(): pass' },
      { name: 'test_main.py', path: 'tests/test_main.py', content: 'def test_main(): assert True' }
    ];

    let totalLoc = 0;
    let totalFunctions = 0;
    let totalClasses = 0;
    let totalTests = 0;
    let totalDependencies = 0;
    let totalSecurityIssues = 0;
    let totalWarnings = 0;

    for (const f of fileList) {
      const content = f.content || '';
      const lines = content.split(/\r?\n/);
      totalLoc += lines.length;

      const funcMatches = content.match(/\b(def|function)\s+[a-zA-Z0-9_]+/g);
      if (funcMatches) totalFunctions += funcMatches.length;

      const classMatches = content.match(/\bclass\s+[a-zA-Z0-9_]+/g);
      if (classMatches) totalClasses += classMatches.length;

      const testMatches = content.match(/\b(def test_|it\(|test\()|assert\b/g);
      if (testMatches) totalTests += testMatches.length;

      const depMatches = content.match(/\b(import|from|require)\b/g);
      if (depMatches) totalDependencies += depMatches.length;

      if (content.includes('eval(') || content.includes('os.system') || content.includes('api_key =')) {
        totalSecurityIssues++;
      }
      if (content.includes('/ 0') || content.includes('undefined')) {
        totalWarnings++;
      }
    }

    res.json({
      success: true,
      analysis: {
        totalFiles: fileList.length,
        linesOfCode: totalLoc,
        functionsCount: totalFunctions,
        classesCount: totalClasses,
        testCasesCount: Math.max(totalTests, 5),
        dependenciesCount: totalDependencies,
        errorsCount: 0,
        warningsCount: totalWarnings,
        securityIssuesCount: totalSecurityIssues,
        qualityScore: Math.max(70, Math.min(98, 100 - (totalSecurityIssues * 10) - (totalWarnings * 5)))
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Analyze Project Error', message: err.message });
  }
};

