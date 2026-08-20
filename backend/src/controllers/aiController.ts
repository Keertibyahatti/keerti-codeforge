import { Request, Response } from 'express';
import { DebugOrchestrator } from '../services/execution/DebugOrchestrator';
import { AIService } from '../services/aiService';
import { ExecutorFactory } from '../executors/executorFactory';
import { prisma } from '../utils/prisma';

export const autoFixCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, code, files, entryFile, stdin, userInput } = req.body;

    if (!language || (!code && (!files || files.length === 0))) {
      res.status(400).json({
        success: false,
        errorReason: 'INVALID_REQUEST',
        errorMessage: 'Language and source code are required.'
      });
      return;
    }

    const orchestratorResult = await DebugOrchestrator.autoRepairAndRun({
      language,
      code,
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

    if (!language || !code) {
      res.status(400).json({ success: false, errorReason: 'INVALID_REQUEST', errorMessage: 'Language and code are required.' });
      return;
    }

    const analysis = await AIService.analyzeError({
      language,
      code,
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
            correctedCode: analysis.correctedCode || code,
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

    if (!language || !code) {
      res.status(400).json({ success: false, errorReason: 'INVALID_REQUEST', errorMessage: 'Language and code are required.' });
      return;
    }

    const optimization = await AIService.optimizeCode({
      language,
      code,
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
      language,
      code,
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
