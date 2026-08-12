import { Request, Response } from 'express';
import { AIService } from '../services/aiService';
import { prisma } from '../utils/prisma';

export const analyzeError = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, code, stderr, stdout, userInput, executionId } = req.body;

    if (!language || !code) {
      res.status(400).json({ error: 'Validation Error', message: 'Language and code are required' });
      return;
    }

    const analysis = await AIService.analyzeError({
      language,
      code,
      stderr: stderr || '',
      stdout: stdout || '',
      userInput: userInput || ''
    });

    // Save analysis record if executionId is provided
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
    res.status(500).json({ error: 'AI Analysis Error', message: error.message });
  }
};

export const optimizeCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, code, stdout, userInput } = req.body;

    if (!language || !code) {
      res.status(400).json({ error: 'Validation Error', message: 'Language and code are required' });
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
    res.status(500).json({ error: 'AI Optimization Error', message: error.message });
  }
};
