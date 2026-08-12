import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import programRoutes from './routes/programRoutes';
import executionRoutes from './routes/executionRoutes';
import aiRoutes from './routes/aiRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite dev server (port 5173 / localhost)
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CodeForge AI Backend API',
    timestamp: new Date().toISOString(),
    supportedLanguages: ['python', 'javascript', 'c', 'cpp', 'java']
  });
});

// Register Module Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/executions', executionRoutes);
app.use('/api/ai', aiRoutes);

// Global Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`⚡ CodeForge AI Backend API Running on http://localhost:${PORT}`);
  console.log(`   Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`===================================================`);
});
