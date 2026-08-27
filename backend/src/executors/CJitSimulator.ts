import { ExecutionOptions, ExecutionResult } from './baseExecutor';
import vm from 'vm';

export class CJitSimulator {
  static cleanParamTypes(paramStr: string): string {
    if (!paramStr || !paramStr.trim() || paramStr.trim() === 'void') return '';
    return paramStr.split(',').map(param => {
      let p = param.trim();
      // Remove const, *, &, [], types
      p = p.replace(/\b(const|unsigned|signed|int|double|float|char|bool|long|short|void|auto)\b/g, '')
           .replace(/[\*&\[\]0-9]/g, '')
           .trim();
      return p;
    }).filter(Boolean).join(', ');
  }

  static transpileCToJS(cCode: string): string {
    let js = cCode;

    // 1. Remove comments and preprocessor directives
    js = js.replace(/#include\s*<.*?>/g, '')
           .replace(/#include\s*".*?"/g, '')
           .replace(/#define\s+[^\n]+/g, '');

    // 2. Transpile sizeof(arr) / sizeof(arr[0]) and sizeof(arr)
    js = js.replace(/sizeof\s*\(\s*(\w+)\s*\)\s*\/\s*sizeof\s*\(\s*\w+\[\s*0\s*\]\s*\)/g, '$1.length')
           .replace(/sizeof\s*\(\s*(\w+)\s*\)/g, '$1.length');

    // 3. Transpile Array initializations: double scores[] = {85.0, 92.0}; -> let scores = [85.0, 92.0];
    js = js.replace(/\b(?:int|double|float|char|bool|long|short|unsigned)\s+(\w+)\s*\[\s*\d*\s*\]\s*=\s*\{([^}]*)\}/g, 'let $1 = [$2]')
           .replace(/\b(?:int|double|float|char|bool|long|short|unsigned)\s+(\w+)\s*\[\s*\d+\s*\]\s*;/g, 'let $1 = [];');

    // 4. Transpile Function Definitions: void calculate_grade(double scores[], int n) { -> function calculate_grade(scores, n) {
    js = js.replace(/\b(?:void|int|double|float|bool|char\*?|char|long|short|auto)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g, (_m, fnName, params) => {
      const cleanParams = CJitSimulator.cleanParamTypes(params);
      return `function ${fnName}(${cleanParams}) {`;
    });

    // 5. Transpile Pointer & Variable Declarations: char* grade = "F"; -> let grade = "F";
    js = js.replace(/\b(?:const\s+)?(?:char|int|double|float|bool|long|short|unsigned|auto)\s*\*\s*(\w+)/g, 'let $1')
           .replace(/\b(?:const\s+)?(?:int|double|float|bool|long|short|unsigned|auto)\s+(\w+)/g, 'let $1');

    // 6. Transpile printf("...", ...)
    js = js.replace(/printf\s*\(([^;]+)\);/g, (_m, args) => {
      return `__printf(${args});`;
    });

    // 7. Transpile scanf("...", &var)
    js = js.replace(/scanf\s*\([^,]+,\s*&?(\w+)\);/g, (_m, varName) => {
      return `${varName} = __readNextStdin();`;
    });

    return js;
  }

  static async execute(options: ExecutionOptions): Promise<ExecutionResult> {
    const startTime = Date.now();
    const code = options.code || '';
    const input = options.input || '';

    // Check missing main()
    if (!/int\s+main\s*\(/.test(code) && !/void\s+main\s*\(/.test(code) && !/main\s*\(/.test(code)) {
      return {
        status: 'compilation_error',
        stdout: '',
        stderr: `main.c: error: undefined reference to 'main'\ncollect2.exe: error: ld returned 1 exit status`,
        executionTime: Date.now() - startTime,
        exitCode: 1
      };
    }

    try {
      const jsCode = CJitSimulator.transpileCToJS(code);

      let stdoutBuffer = '';
      const stdinTokens = input.trim().split(/\s+/).filter(Boolean);
      let stdinIndex = 0;

      const sandbox: any = {
        __stdout: '',
        __readNextStdin: () => {
          if (stdinIndex < stdinTokens.length) {
            const token = stdinTokens[stdinIndex++];
            const num = Number(token);
            return isNaN(num) ? token : num;
          }
          return 0;
        },
        __printf: (fmt: string, ...args: any[]) => {
          let out = String(fmt);
          let argIdx = 0;
          out = out.replace(/%(\.?\d*)f|%d|%i|%s|%c/g, (_match, precision) => {
            if (argIdx >= args.length) return '';
            const arg = args[argIdx++];
            if (precision && precision.startsWith('.')) {
              const decimals = parseInt(precision.substring(1), 10);
              return !isNaN(decimals) ? Number(arg).toFixed(decimals) : String(arg);
            }
            return String(arg);
          });
          sandbox.__stdout += out.replace(/\\n/g, '\n');
        },
        Math,
        console: {
          log: (...args: any[]) => {
            sandbox.__stdout += args.join(' ') + '\n';
          }
        }
      };

      const script = new vm.Script(`
        (function() {
          ${jsCode}
          if (typeof main === 'function') {
            main();
          }
        })();
      `);

      const context = vm.createContext(sandbox);
      script.runInContext(context, { timeout: options.timeoutMs || 5000 });

      stdoutBuffer = sandbox.__stdout || '';

      return {
        status: 'success',
        stdout: stdoutBuffer,
        stderr: '',
        executionTime: Date.now() - startTime,
        exitCode: 0
      };
    } catch (err: any) {
      return {
        status: 'runtime_error',
        stdout: '',
        stderr: `main.c: runtime error: ${err.message || 'Execution failed'}`,
        executionTime: Date.now() - startTime,
        exitCode: 1
      };
    }
  }
}
