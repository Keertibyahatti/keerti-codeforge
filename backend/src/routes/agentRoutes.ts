import { Router } from 'express';
import { runAgentPipeline } from '../controllers/agentController';

const router = Router();

router.post('/pipeline', runAgentPipeline);
router.post('/run', runAgentPipeline);

export default router;
