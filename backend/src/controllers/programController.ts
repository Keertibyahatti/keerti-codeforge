import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

const programSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  language: z.string().min(1, 'Language is required'),
  code: z.string()
});

export const createProgram = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parseResult = programSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: 'Validation Error', details: parseResult.error.flatten().fieldErrors });
      return;
    }

    const userId = req.user!.userId;
    const { title, language, code } = parseResult.data;

    const program = await prisma.program.create({
      data: {
        userId,
        title,
        language: language.toLowerCase(),
        code,
        versions: {
          create: {
            code,
            language: language.toLowerCase()
          }
        }
      },
      include: { versions: true }
    });

    res.status(201).json({ message: 'Program created successfully', program });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

export const getPrograms = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { search, language } = req.query;

    const whereClause: any = { userId };
    if (search && typeof search === 'string' && search.trim()) {
      whereClause.title = { contains: search.trim() };
    }
    if (language && typeof language === 'string' && language.trim()) {
      whereClause.language = language.toLowerCase().trim();
    }

    const programs = await prisma.program.findMany({
      where: whereClause,
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: { select: { versions: true, executions: true } }
      }
    });

    res.json({ programs });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

export const getProgramById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;

    const program = await prisma.program.findFirst({
      where: { id, userId },
      include: {
        versions: { orderBy: { createdAt: 'desc' } },
        executions: { orderBy: { createdAt: 'desc' }, take: 10 }
      }
    });

    if (!program) {
      res.status(404).json({ error: 'Not Found', message: 'Program not found or access denied' });
      return;
    }

    res.json({ program });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

export const updateProgram = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;
    const { title, language, code, createNewVersion } = req.body;

    const existingProgram = await prisma.program.findFirst({ where: { id, userId } });
    if (!existingProgram) {
      res.status(404).json({ error: 'Not Found', message: 'Program not found' });
      return;
    }

    const updatedProgram = await prisma.program.update({
      where: { id },
      data: {
        ...(title ? { title } : {}),
        ...(language ? { language: language.toLowerCase() } : {}),
        ...(code !== undefined ? { code } : {}),
        ...(createNewVersion && code !== undefined ? {
          versions: {
            create: { code, language: (language || existingProgram.language).toLowerCase() }
          }
        } : {})
      },
      include: { versions: { orderBy: { createdAt: 'desc' } } }
    });

    res.json({ message: 'Program updated successfully', program: updatedProgram });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

export const deleteProgram = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;

    const existingProgram = await prisma.program.findFirst({ where: { id, userId } });
    if (!existingProgram) {
      res.status(404).json({ error: 'Not Found', message: 'Program not found' });
      return;
    }

    await prisma.program.delete({ where: { id } });

    res.json({ message: 'Program deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

export const duplicateProgram = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;

    const existingProgram = await prisma.program.findFirst({ where: { id, userId } });
    if (!existingProgram) {
      res.status(404).json({ error: 'Not Found', message: 'Program not found' });
      return;
    }

    const duplicated = await prisma.program.create({
      data: {
        userId,
        title: `${existingProgram.title} (Copy)`,
        language: existingProgram.language,
        code: existingProgram.code,
        versions: {
          create: {
            code: existingProgram.code,
            language: existingProgram.language
          }
        }
      },
      include: { versions: true }
    });

    res.status(201).json({ message: 'Program duplicated successfully', program: duplicated });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};
