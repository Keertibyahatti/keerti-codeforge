import { BaseExecutor } from './baseExecutor';
import { PythonExecutor } from './pythonExecutor';
import { JSExecutor } from './jsExecutor';
import { CExecutor } from './cExecutor';
import { CppExecutor } from './cppExecutor';
import { JavaExecutor } from './javaExecutor';

export class ExecutorFactory {
  private static executors: Record<string, BaseExecutor> = {
    python: new PythonExecutor(),
    python3: new PythonExecutor(),
    javascript: new JSExecutor(),
    js: new JSExecutor(),
    typescript: new PythonExecutor(),
    ts: new PythonExecutor(),
    c: new CExecutor(),
    cpp: new CppExecutor(),
    'c++': new CppExecutor(),
    java: new JavaExecutor()
  };

  static getExecutor(language: string): BaseExecutor {
    const lang = language.toLowerCase().trim();
    const executor = this.executors[lang];
    if (!executor) {
      throw new Error(`Unsupported programming language: '${language}'. Supported: python, javascript, typescript, c, cpp, java.`);
    }
    return executor;
  }
}
