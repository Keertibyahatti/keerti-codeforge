import { ExecutionOptions, ExecutionResult } from './baseExecutor';
import vm from 'vm';

export class CppJitSimulator {
  static cleanParamTypes(paramStr: string): string {
    if (!paramStr || !paramStr.trim() || paramStr.trim() === 'void') return '';
    return paramStr.split(',').map(param => {
      let p = param.trim();
      // Remove std::vector<...>, std::string, const, *, &, [], types
      p = p.replace(/\b(?:std::)?vector\s*<.*?>\b/g, '')
           .replace(/\b(?:std::)?string\b/g, '')
           .replace(/\b(const|unsigned|signed|int|double|float|char|bool|long|short|void|auto)\b/g, '')
           .replace(/[\*&\[\]0-9]/g, '')
           .trim();
      return p;
    }).filter(Boolean).join(', ');
  }

  static transpileCppToJS(cppCode: string): string {
    let js = cppCode;

    // 1. Remove preprocessor directives and namespaces
    js = js.replace(/#include\s*<.*?>/g, '')
           .replace(/#include\s*".*?"/g, '')
           .replace(/#define\s+[^\n]+/g, '')
           .replace(/using\s+namespace\s+std\s*;/g, '');

    // 2. Transpile std::vector & array initializations
    js = js.replace(/\b(?:std::)?vector\s*<.*?>\s+(\w+)\s*=\s*\{([^}]*)\}/g, 'let $1 = [$2]')
           .replace(/\b(?:std::)?vector\s*<.*?>\s+(\w+)/g, 'let $1 = []')
           .replace(/\b(?:int|double|float|char|bool|long|short|unsigned)\s+(\w+)\s*\[\s*\d*\s*\]\s*=\s*\{([^}]*)\}/g, 'let $1 = [$2]')
           .replace(/\b(?:int|double|float|char|bool|long|short|unsigned)\s+(\w+)\s*\[\s*\d+\s*\]\s*;/g, 'let $1 = [];');

    // 3. Transpile Function Definitions
    js = js.replace(/\b(?:void|int|double|float|bool|char\*?|char|long|short|auto|string|std::string)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g, (_m, fnName, params) => {
      const cleanParams = CppJitSimulator.cleanParamTypes(params);
      return `function ${fnName}(${cleanParams}) {`;
    });

    // 4. Strip I/O manipulators like std::fixed, std::setprecision(2)
    js = js.replace(/(?:std::)?(?:fixed|boolalpha|showpoint|setprecision\s*\([^)]*\))\s*<<\s*/g, '')
           .replace(/<<\s*(?:std::)?(?:fixed|boolalpha|showpoint|setprecision\s*\([^)]*\))/g, '')
           .replace(/(?:std::)?setprecision\s*\([^)]*\)/g, '""')
           .replace(/(?:std::)?fixed/g, '""')
           .replace(/(?:std::)?cout\s*;/g, '')
           .replace(/(?:std::)?cin\s*;/g, '');

    // 5. Replace std::cout << ... << std::endl;
    js = js.replace(/(?:std::)?cout\s*<<\s*([^;]+);/g, (_m, exprs) => {
      const parts = exprs.split(/<<\s*/).map((p: string) => {
        const trimmed = p.trim();
        if (trimmed === 'std::endl' || trimmed === 'endl') return '"\\n"';
        if (!trimmed || trimmed === '""') return null;
        return trimmed;
      }).filter(Boolean);
      return parts.length > 0 ? `__stdout += [${parts.join(', ')}].join('');` : '';
    });

    // 6. Replace std::cin >> a >> b
    js = js.replace(/(?:std::)?cin\s*>>\s*([^;]+);/g, (_m, vars) => {
      const varList = vars.split(/>>\s*/).map((v: string) => v.trim());
      return varList.map((v: string) => `${v} = __readNextStdin();`).join('\n');
    });

    // 7. Replace printf("...", ...)
    js = js.replace(/printf\s*\(([^;]+)\);/g, (_m, args) => {
      return `__printf(${args});`;
    });

    // 8. Transpile variable declarations
    js = js.replace(/\b(?:std::)?string\s+(\w+)\s*=\s*/g, 'let $1 = ')
           .replace(/\b(?:std::)?string\s+(\w+)\s*;/g, 'let $1 = "";')
           .replace(/\b(?:const\s+)?(?:char|int|double|float|bool|long|short|unsigned|auto)\s*\*\s*(\w+)/g, 'let $1')
           .replace(/\b(?:const\s+)?(?:int|double|float|bool|long|short|unsigned|auto)\s+(\w+)/g, 'let $1');

    // 9. Replace STL algorithms & math
    js = js.replace(/\bstd::min\b/g, 'Math.min')
           .replace(/\bstd::max\b/g, 'Math.max')
           .replace(/\bstd::accumulate\s*\(\s*(\w+)\.begin\(\)\s*,\s*\w+\.end\(\)\s*,\s*[^)]+\)/g, '$1.reduce((sum, v) => sum + v, 0)')
           .replace(/\b(\w+)\.empty\(\)/g, '($1.length === 0)')
           .replace(/\b(\w+)\.size\(\)/g, '$1.length');

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
        stderr: `main.cpp: error: undefined reference to 'main'\ncollect2.exe: error: ld returned 1 exit status`,
        executionTime: Date.now() - startTime,
        exitCode: 1
      };
    }

    try {
      const jsCode = CppJitSimulator.transpileCppToJS(code);

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
        stderr: `main.cpp: runtime error: ${err.message || 'Execution failed'}`,
        executionTime: Date.now() - startTime,
        exitCode: 1
      };
    }
  }
}
