import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { hashPassword, comparePassword } from '../utils/security';
import { signToken } from '../utils/jwt';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: 'Validation Error', details: parseResult.error.flatten().fieldErrors });
      return;
    }

    const { name, email, password } = parseResult.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'Conflict', message: 'An account with this email already exists.' });
      return;
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    const token = signToken({ userId: user.id, email: user.email });

    res.status(201).json({
      message: 'Registration successful',
      user,
      token
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: 'Validation Error', details: parseResult.error.flatten().fieldErrors });
      return;
    }

    const { email, password } = parseResult.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Unauthorized', message: 'Invalid email or password' });
      return;
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      res.status(401).json({ error: 'Unauthorized', message: 'Invalid email or password' });
      return;
    }

    const token = signToken({ userId: user.id, email: user.email });

    res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
      token
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};

export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });

    if (!user) {
      res.status(404).json({ error: 'Not Found', message: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (error: any) {
    res.status(500).json({ error: 'Server Error', message: error.message });
  }
};
