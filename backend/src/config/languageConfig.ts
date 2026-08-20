export interface LanguageConfig {
  language: string;
  fileExtension: string;
  compileCommand?: string;
  runCommand: string;
  timeout: number;
  memoryLimit: number;
  inputMode: 'stdin' | 'arg';
  testCommand?: string;
  displayName: string;
}

export const LANGUAGE_CONFIGS: Record<string, LanguageConfig> = {
  python: {
    language: 'python',
    fileExtension: '.py',
    compileCommand: 'python -m py_compile {file}',
    runCommand: 'python {file}',
    timeout: 5000,
    memoryLimit: 128,
    inputMode: 'stdin',
    testCommand: 'pytest {file}',
    displayName: 'Python 3'
  },
  javascript: {
    language: 'javascript',
    fileExtension: '.js',
    compileCommand: 'node --check {file}',
    runCommand: 'node {file}',
    timeout: 5000,
    memoryLimit: 128,
    inputMode: 'stdin',
    testCommand: 'npx jest {file}',
    displayName: 'JavaScript (Node.js)'
  },
  typescript: {
    language: 'typescript',
    fileExtension: '.ts',
    compileCommand: 'npx tsc --noEmit {file}',
    runCommand: 'npx tsx {file}',
    timeout: 8000,
    memoryLimit: 256,
    inputMode: 'stdin',
    testCommand: 'npx jest {file}',
    displayName: 'TypeScript'
  },
  java: {
    language: 'java',
    fileExtension: '.java',
    compileCommand: 'javac {file}',
    runCommand: 'java -cp {dir} {mainClass}',
    timeout: 8000,
    memoryLimit: 256,
    inputMode: 'stdin',
    displayName: 'Java 17'
  },
  c: {
    language: 'c',
    fileExtension: '.c',
    compileCommand: 'gcc -o {executable} {file}',
    runCommand: '{executable}',
    timeout: 5000,
    memoryLimit: 64,
    inputMode: 'stdin',
    displayName: 'C (GCC)'
  },
  cpp: {
    language: 'cpp',
    fileExtension: '.cpp',
    compileCommand: 'g++ -o {executable} {file}',
    runCommand: '{executable}',
    timeout: 5000,
    memoryLimit: 64,
    inputMode: 'stdin',
    displayName: 'C++ (G++)'
  }
};

export class LanguageConfigRegistry {
  static getConfig(language: string): LanguageConfig {
    const key = (language || 'python').toLowerCase();
    if (key === 'py') return LANGUAGE_CONFIGS.python;
    if (key === 'js') return LANGUAGE_CONFIGS.javascript;
    if (key === 'ts') return LANGUAGE_CONFIGS.typescript;
    if (key === 'c++') return LANGUAGE_CONFIGS.cpp;
    
    return LANGUAGE_CONFIGS[key] || LANGUAGE_CONFIGS.python;
  }

  static isSupported(language: string): boolean {
    const key = (language || '').toLowerCase();
    return Boolean(LANGUAGE_CONFIGS[key] || key === 'py' || key === 'js' || key === 'ts' || key === 'c++');
  }

  static getSupportedLanguages(): string[] {
    return Object.keys(LANGUAGE_CONFIGS);
  }
}
