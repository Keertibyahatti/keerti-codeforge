// AI Voice & Speech Assistant for CodeForge AI Platform

export interface ErrorVoiceDetails {
  language?: string;
  errorType?: string;
  errorLine?: number;
  errorSnippet?: string;
  stderr?: string;
  code?: string;
  whatHappened?: string;
  whyItHappened?: string;
  howToFix?: string;
}

export class VoiceAssistant {
  private static isSpeaking: boolean = false;
  private static activeUtterance: SpeechSynthesisUtterance | null = null;
  private static autoVoiceEnabled: boolean = true;

  static isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  static isAutoVoiceEnabled(): boolean {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('codeforge_auto_voice');
    return stored === null ? true : stored === 'true';
  }

  static setAutoVoiceEnabled(enabled: boolean): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('codeforge_auto_voice', String(enabled));
    }
  }

  static stop(): void {
    if (VoiceAssistant.isSupported()) {
      window.speechSynthesis.cancel();
      VoiceAssistant.isSpeaking = false;
      VoiceAssistant.activeUtterance = null;
    }
  }

  private static formatSnippetForSpeech(snippet: string): string {
    if (!snippet) return '';
    return snippet
      .replace(/\/\s*0\b/g, ' divided by zero ')
      .replace(/\//g, ' divided by ')
      .replace(/\*/g, ' times ')
      .replace(/!=/g, ' is not equal to ')
      .replace(/==/g, ' equals ')
      .replace(/<=/g, ' is less than or equal to ')
      .replace(/>=/g, ' is greater than or equal to ')
      .replace(/&&/g, ' and ')
      .replace(/\|\|/g, ' or ')
      .replace(/;/g, '')
      .replace(/\{/g, ' open brace ')
      .replace(/\}/g, ' close brace ')
      .trim();
  }

  static generateErrorSpeechScript(details: ErrorVoiceDetails): { title: string; script: string; howToFix: string } {
    const lang = (details.language || 'Python');
    const rawStderr = details.stderr || '';
    const line = details.errorLine || 1;
    const rawSnippet = details.errorSnippet || '';
    const phoneticSnippet = VoiceAssistant.formatSnippetForSpeech(rawSnippet);

    let errType = details.errorType || 'Runtime Error';
    let whatHappened = details.whatHappened || `An execution issue occurred during ${lang} execution on line ${line}.`;
    let whyItHappened = details.whyItHappened || 'The code attempted an operation that violates language execution rules.';
    let howToFix = details.howToFix || 'Review the highlighted line, check variable declarations and syntax operators, then click AI Fix.';

    if (rawStderr.includes('ZeroDivisionError') || rawStderr.includes('division by zero') || rawStderr.includes('Infinity') || errType === 'ZeroDivisionError') {
      errType = 'Zero Division Error';
      whatHappened = `Your ${lang} program crashed because it attempted to divide a number by zero. In mathematics and computer science, dividing by zero is undefined.`;
      whyItHappened = `The denominator or divisor evaluates to zero during execution.`;
      howToFix = `Change the divisor to a non-zero number, or add a condition check before dividing to handle zero safely. Click AI Auto-Fix to apply the verified correction.`;
    } else if (rawStderr.includes('NameError') || rawStderr.includes('not defined') || rawStderr.includes('was not declared') || errType === 'NameError') {
      const match = rawStderr.match(/name '([^']+)' is not defined/) || rawStderr.match(/identifier '([^']+)'/) || rawStderr.match(/'([^']+)' was not declared/);
      const varName = match ? match[1] : 'variable';
      errType = 'Undefined Name Error';
      whatHappened = `Your code referenced the identifier "${varName}", which has not been declared or initialized.`;
      whyItHappened = `This is commonly caused by a spelling mistake or accessing a variable before assigning it.`;
      howToFix = `Check the spelling of "${varName}" or define and initialize it before line ${line}.`;
    } else if (rawStderr.includes('SyntaxError') || rawStderr.includes('expected') || rawStderr.includes('unexpected') || errType === 'SyntaxError') {
      errType = 'Syntax Error';
      whatHappened = `Your code contains invalid syntax on line ${line}.`;
      whyItHappened = `A required symbol such as a colon, semicolon, parenthesis, or quote was omitted or placed incorrectly.`;
      howToFix = `Inspect the end of line ${line} for missing closing brackets, quotes, or colons.`;
    } else if (rawStderr.includes('IndexError') || rawStderr.includes('out of bounds') || rawStderr.includes('out of range') || errType === 'IndexError') {
      errType = 'Index Out of Range Error';
      whatHappened = `Your program attempted to access an element beyond the size of the collection.`;
      whyItHappened = `The requested index is greater than or equal to the array length, or negative.`;
      howToFix = `Ensure loop bounds stay within valid index limits from 0 to length minus 1.`;
    } else if (rawStderr.includes('TypeError') || errType === 'TypeError') {
      errType = 'Type Error';
      whatHappened = `Your program performed an unsupported operation between incompatible data types.`;
      whyItHappened = `For example, attempting to combine or add a text string directly with an integer without casting.`;
      howToFix = `Cast or convert the variable types explicitly using integer or string conversion functions before the operation.`;
    } else if (rawStderr.includes('timeout') || rawStderr.includes('timed out') || errType === 'Timeout') {
      errType = 'Execution Timeout';
      whatHappened = `Your program exceeded the execution time limit and was stopped.`;
      whyItHappened = `This is typically caused by an infinite loop where the exit condition is never satisfied.`;
      howToFix = `Check your while or for loop conditions and verify that the loop counter is advancing toward the exit condition.`;
    }

    const snippetText = phoneticSnippet ? `The statement reads: "${phoneticSnippet}".` : '';
    const script = `Attention! In your ${lang} program, an error was detected on Line ${line}. ${snippetText} Error category: ${errType}. ${whatHappened} How to fix: ${howToFix}`;

    return {
      title: errType,
      script,
      howToFix
    };
  }

  static speakError(
    details: ErrorVoiceDetails,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (!VoiceAssistant.isSupported()) return;

    VoiceAssistant.stop();

    const { script } = VoiceAssistant.generateErrorSpeechScript(details);
    const utterance = new SpeechSynthesisUtterance(script);

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick a natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('English') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('David')) && v.lang.startsWith('en'));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      VoiceAssistant.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      VoiceAssistant.isSpeaking = false;
      VoiceAssistant.activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      VoiceAssistant.isSpeaking = false;
      VoiceAssistant.activeUtterance = null;
      if (onEnd) onEnd();
    };

    VoiceAssistant.activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }
}
