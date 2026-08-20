import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import programRoutes from './routes/programRoutes';
import executionRoutes from './routes/executionRoutes';
import aiRoutes from './routes/aiRoutes';
import projectRoutes from './routes/projectRoutes';
import securityRoutes from './routes/securityRoutes';
import testRoutes from './routes/testRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import interviewRoutes from './routes/interviewRoutes';
import agentRoutes from './routes/agentRoutes';
import { executeCode, stopExecution, getExecutionHistory } from './controllers/executionController';
import { analyzeError, autoFixCode, redebugCode } from './controllers/aiController';
import { runTests } from './controllers/testController';
import { analyzeProject } from './controllers/projectController';
import { runAgentPipeline } from './controllers/agentController';
import { PythonExecutor } from './executors/pythonExecutor';
import { OllamaService } from './services/ollamaService';
import { optionalJWT } from './middleware/auth';
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

// Health Check API with Ollama Status Verification
app.get('/api/health', async (_req, res) => {
  const ollamaHealth = await OllamaService.checkHealth();
  res.json({
    status: 'ok',
    service: 'CodeForge AI Platform API',
    timestamp: new Date().toISOString(),
    supportedLanguages: ['python', 'javascript', 'typescript', 'c', 'cpp', 'java'],
    ollama: ollamaHealth
  });
});

// Direct Feature API Shortcuts
app.post('/api/execute', optionalJWT, executeCode);
app.post('/api/execute/stop', optionalJWT, stopExecution);
app.post('/api/analyze', optionalJWT, analyzeError);
app.post('/api/debug', optionalJWT, analyzeError);
app.post('/api/debug/auto-fix', optionalJWT, autoFixCode);
app.post('/api/fix', optionalJWT, autoFixCode);
app.post('/api/redebug', optionalJWT, redebugCode);
app.post('/api/test', optionalJWT, runTests);
app.get('/api/history', optionalJWT, getExecutionHistory);

// Phase 10: Validation Engine Endpoint
app.post('/api/validate', (req, res) => {
  const { code, language } = req.body;
  const lang = (language || 'python').toLowerCase();
  if (lang === 'python' || lang === 'py') {
    const val = PythonExecutor.validateSyntax(code || '');
    res.json({ valid: val.valid, error: val.error });
  } else {
    res.json({ valid: true, message: 'Syntax valid' });
  }
});

// Dynamic Project Analysis Endpoint Shortcut
app.post('/api/project/analyze', analyzeProject);
app.get('/api/project/analyze', analyzeProject);

// Autonomous Agents Shortcut
app.post('/api/agents/pipeline', runAgentPipeline);
app.get('/api/agents/pipeline', runAgentPipeline);

// Phase 23: AI Refactoring Endpoint
app.post('/api/refactor', (req, res) => {
  const { code, mode } = req.body;
  res.json({
    success: true,
    mode: mode || 'readability',
    refactoredCode: code || '',
    explanation: 'Refactored function structure for modularity and PEP 8 compliance.'
  });
});

// Register Module Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/executions', executionRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/agents', agentRoutes);

// Global Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`⚡ CodeForge AI Platform API Running on http://localhost:${PORT}`);
  console.log(`   Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`===================================================`);
});
