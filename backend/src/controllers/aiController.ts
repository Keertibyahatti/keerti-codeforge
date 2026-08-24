import { Request, Response } from 'express';
import { DebugOrchestrator } from '../services/execution/DebugOrchestrator';
import { AIService } from '../services/aiService';
import { prisma } from '../utils/prisma';

export const autoFixCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, code, files, entryFile, stdin, userInput } = req.body;

    const targetLanguage = (language || 'python').toLowerCase();
    let targetCode = (code || '').trim();

    if (!targetCode && Array.isArray(files) && files.length > 0) {
      const mainFile = files.find((f: any) => f.name === 'main.py' || f.name === 'index.js') || files[0];
      targetCode = (mainFile?.content || '').trim();
    }

    if (!targetCode) {
      res.status(200).json({
        success: false,
        errorReason: 'INVALID_REQUEST',
        errorMessage: 'Source code is empty. Please enter code to repair.',
        fixedCode: '',
        finalCode: '',
        output: '',
        attempts: 0
      });
      return;
    }

    const orchestratorResult = await DebugOrchestrator.autoRepairAndRun({
      language: targetLanguage,
      code: targetCode,
      files,
      entryFile,
      stdin: stdin ?? userInput ?? ''
    });

    if (orchestratorResult.success) {
      res.json({
        success: true,
        fixedCode: orchestratorResult.finalCode,
        finalCode: orchestratorResult.finalCode,
        rootCause: orchestratorResult.explanation?.rootCause || orchestratorResult.explanation?.whyItHappened || 'Resolved execution error.',
        explanation: orchestratorResult.explanation?.howFixed || orchestratorResult.message || 'Auto-fix verified and re-executed cleanly.',
        errorType: orchestratorResult.explanation?.whatHappened ? orchestratorResult.explanation.whatHappened.split(':')[0] : 'None',
        errorLine: 1,
        confidence: 0.98,
        attempts: orchestratorResult.attempts,
        output: orchestratorResult.output,
        stdout: orchestratorResult.output,
        versions: orchestratorResult.versions
      });
    } else {
      res.json({
        success: false,
        errorReason: orchestratorResult.reasonCode || 'REPAIR_FAILED',
        errorMessage: orchestratorResult.message || 'Auto-Fix could not safely resolve this error.',
        fixedCode: orchestratorResult.finalCode,
        finalCode: orchestratorResult.finalCode,
        rootCause: orchestratorResult.explanation?.whyItHappened || 'Auto-repair reached attempt limit or no progress.',
        explanation: orchestratorResult.explanation?.howFixed || orchestratorResult.message || 'Preserved code state for developer review.',
        attempts: orchestratorResult.attempts,
        output: orchestratorResult.output,
        stdout: orchestratorResult.output,
        stderr: orchestratorResult.error
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      errorReason: 'SERVER_ERROR',
      errorMessage: error.message || 'An internal server error occurred during auto-fix.'
    });
  }
};

export const analyzeError = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, code, stderr, stdout, userInput, executionId } = req.body;

    const targetLanguage = language || 'python';
    const targetCode = code || '';

    if (!targetCode) {
      res.status(400).json({ success: false, errorReason: 'INVALID_REQUEST', errorMessage: 'Language and code are required.' });
      return;
    }

    const analysis = await AIService.analyzeError({
      language: targetLanguage,
      code: targetCode,
      stderr: stderr || '',
      stdout: stdout || '',
      userInput: userInput || ''
    });

    if (executionId) {
      try {
        await prisma.aIAnalysis.create({
          data: {
            executionId,
            errorType: analysis.errorType || 'Syntax / Logic Issue',
            explanation: analysis.explanation || '',
            possibleCause: analysis.possibleCause || '',
            suggestedFix: analysis.suggestedFix || '',
            correctedCode: analysis.correctedCode || targetCode,
            optimizationSuggestions: JSON.stringify(analysis.optimizationSuggestions || [])
          }
        });
      } catch (dbErr) {
        console.warn('Could not store AI analysis in database:', dbErr);
      }
    }

    res.json(analysis);
  } catch (error: any) {
    res.status(500).json({ success: false, errorReason: 'ANALYSIS_ERROR', errorMessage: error.message });
  }
};

export const optimizeCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, code, stdout, userInput } = req.body;

    const targetLanguage = language || 'python';
    const targetCode = code || '';

    if (!targetCode) {
      res.status(400).json({ success: false, errorReason: 'INVALID_REQUEST', errorMessage: 'Language and code are required.' });
      return;
    }

    const optimization = await AIService.optimizeCode({
      language: targetLanguage,
      code: targetCode,
      stdout: stdout || '',
      userInput: userInput || ''
    });

    res.json(optimization);
  } catch (error: any) {
    res.status(500).json({ success: false, errorReason: 'OPTIMIZATION_ERROR', errorMessage: error.message });
  }
};

export const redebugCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, code, files, entryFile, stdin, userInput } = req.body;
    const orchestratorResult = await DebugOrchestrator.autoRepairAndRun({
      language: language || 'python',
      code: code || '',
      files,
      entryFile,
      stdin: stdin ?? userInput ?? ''
    });

    res.json({
      success: orchestratorResult.success,
      status: orchestratorResult.success ? 'SUCCESS' : 'DEBUGGING_STOPPED',
      message: orchestratorResult.message,
      fixedCode: orchestratorResult.finalCode,
      finalCode: orchestratorResult.finalCode,
      stdout: orchestratorResult.output,
      stderr: orchestratorResult.error || '',
      totalAttempts: orchestratorResult.attempts,
      attempts: orchestratorResult.versions
    });
  } catch (error: any) {
    res.status(500).json({ success: false, errorReason: 'REDEBUG_ERROR', errorMessage: error.message });
  }
};

export const chatWithAIController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { question, message, history } = req.body;
    const q = (question || message || '').trim();

    if (!q) {
      res.status(400).json({ success: false, errorMessage: 'Question or message text is required.' });
      return;
    }

    const { NvidiaService } = await import('../services/ai/NvidiaService');
    const reply = await NvidiaService.chatWithAI(q, history || []);

    res.json({
      success: true,
      reply,
      answer: reply
    });
  } catch (error: any) {
    res.status(500).json({ success: false, errorMessage: error.message || 'Error processing AI chat request.' });
  }
};

export const generateMultiLangController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { promptText, question } = req.body;
    const p = (promptText || question || '').trim();

    if (!p) {
      res.status(400).json({ success: false, errorMessage: 'Prompt text or question is required.' });
      return;
    }

    const { NvidiaService } = await import('../services/ai/NvidiaService');
    const result = await NvidiaService.generateMultiLangCode(p);

    res.json({
      success: true,
      data: result,
      ...result
    });
  } catch (error: any) {
    res.status(500).json({ success: false, errorMessage: error.message || 'Error generating multi-language code.' });
  }
};
