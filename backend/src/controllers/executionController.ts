import { Response } from 'express';
import { z } from 'zod';
import { ExecutorFactory } from '../executors/executorFactory';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

interface ActiveJobHandle {
  killFn: () => void;
  writeStdin: (data: string) => void;
}

const activeJobsMap = new Map<string, ActiveJobHandle>();

export const sendStdinInput = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { executionJobId, input } = req.body;
    if (executionJobId && activeJobsMap.has(executionJobId)) {
      const handle = activeJobsMap.get(executionJobId);
      if (handle && handle.writeStdin) {
        handle.writeStdin(input || '');
        res.json({ success: true, message: 'Input sent to running process stdin.' });
        return;
      }
    }
    for (const [id, handle] of activeJobsMap.entries()) {
      if (handle && handle.writeStdin) {
        handle.writeStdin(input || '');
      }
    }
    res.json({ success: true, message: 'Input sent to active process.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Stdin Stream Error', message: err.message });
  }
};

export const stopExecution = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { executionJobId } = req.body;
    if (executionJobId && activeJobsMap.has(executionJobId)) {
      const handle = activeJobsMap.get(executionJobId);
      if (handle?.killFn) handle.killFn();
      activeJobsMap.delete(executionJobId);
      res.json({ success: true, status: 'stopped', message: 'Execution stopped by user.' });
      return;
    }
    for (const [id, handle] of activeJobsMap.entries()) {
      try { handle.killFn(); } catch {}
      activeJobsMap.delete(id);
    }
    res.json({ success: true, status: 'stopped', message: 'Execution stopped by user.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Stop Execution Error', message: err.message });
  }
};

export const executeCode = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const targetLanguage = (req.body.language || 'python').toLowerCase().trim();
    const targetCode = (req.body.code || '').trim();
    const input = req.body.input || '';
    const programId = req.body.programId;
    const jobId = req.body.executionJobId || `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const userId = req.user?.userId;

    if (!targetCode) {
      res.json({
        executionId: 'none',
        status: 'runtime_error',
        stdout: '',
        stderr: 'Source code is empty. Please enter valid code to execute.',
        executionTime: 0,
        exitCode: 1
      });
      return;
    }

    // Get matching executor instance
    let executor;
    try {
      executor = ExecutorFactory.getExecutor(targetLanguage);
    } catch (executorError: any) {
      res.json({
        executionId: 'none',
        status: 'runtime_error',
        stdout: '',
        stderr: `Unsupported language runtime: ${targetLanguage}`,
        executionTime: 0,
        exitCode: 1
      });
      return;
    }

    // Run execution with 5-second process timeout & cancellation handle
    const result = await executor.execute({
      code: targetCode,
      input,
      timeoutMs: 5000,
      onChildSpawn: (handle) => {
        activeJobsMap.set(jobId, handle);
      }
    });

    activeJobsMap.delete(jobId);

    // Store execution in DB
    try {
      const execution = await prisma.execution.create({
        data: {
          userId: userId || null,
          programId: programId || null,
          language: targetLanguage,
          code: targetCode,
          input: input || '',
          status: result.status,
          stdout: result.stdout,
          stderr: result.stderr,
          executionTime: result.executionTime,
          exitCode: result.exitCode ?? 1
        }
      });

      res.json({
        executionId: execution.id,
        status: result.status,
        stdout: result.stdout,
        stderr: result.stderr,
        executionTime: result.executionTime,
        exitCode: result.exitCode,
        errorLine: result.errorLine,
        errorColumn: result.errorColumn,
        missingSymbol: result.missingSymbol,
        missingOperand: result.missingOperand,
        wrongSymbol: result.wrongSymbol,
        suggestedFixSymbol: result.suggestedFixSymbol,
        errorSnippet: result.errorSnippet,
        createdAt: execution.createdAt
      });
    } catch (dbErr) {
      res.json({
        executionId: `exec_${Date.now()}`,
        status: result.status,
        stdout: result.stdout,
        stderr: result.stderr,
        executionTime: result.executionTime,
        exitCode: result.exitCode ?? 1
      });
    }
  } catch (error: any) {
    console.error('Execution Controller Exception:', error);
    res.status(500).json({ error: 'Execution Error', message: error.message });
  }
};

export const getExecutionHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { language, status, limit, search } = req.query;

    const whereClause: any = {};
    if (userId) whereClause.userId = userId;
    if (language && typeof language === 'string' && language.trim()) {
      whereClause.language = (language as string).toLowerCase().trim();
    }
    if (status && typeof status === 'string' && status.trim()) {
      whereClause.status = status as string;
    }
    if (search && typeof search === 'string' && search.trim()) {
      whereClause.code = { contains: search.trim() };
    }

    const executions = await prisma.execution.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit as string, 10) : 50,
      include: {
        program: { select: { id: true, title: true } },
        aiAnalyses: true
      }
    });

    res.json({ executions });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

export const getExecutionById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const execution = await prisma.execution.findUnique({
      where: { id },
      include: {
        program: true,
        aiAnalyses: { orderBy: { createdAt: 'desc' } }
      }
    });

    if (!execution) {
      res.status(404).json({ error: 'Not Found', message: 'Execution record not found' });
      return;
    }

    res.json({ execution });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const whereUser = userId ? { userId } : {};

    const [totalPrograms, totalExecutions, successfulExecutions, failedExecutions] = await Promise.all([
      prisma.program.count({ where: whereUser }),
      prisma.execution.count({ where: whereUser }),
      prisma.execution.count({ where: { ...whereUser, status: 'success' } }),
      prisma.execution.count({ where: { ...whereUser, status: { not: 'success' } } })
    ]);

    res.json({
      totalPrograms,
      totalExecutions,
      successfulExecutions,
      failedExecutions,
      supportedRuntimesCount: 5,
      supportedRuntimes: ['Python', 'JavaScript', 'C', 'C++', 'Java']
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};
