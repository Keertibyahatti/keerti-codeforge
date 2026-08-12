import { Router } from 'express';
import { executeCode, getExecutionHistory, getExecutionById, getDashboardStats } from '../controllers/executionController';
import { optionalJWT } from '../middleware/auth';

const router = Router();

router.post('/', optionalJWT, executeCode);
router.get('/', optionalJWT, getExecutionHistory);
router.get('/stats', optionalJWT, getDashboardStats);
router.get('/:id', optionalJWT, getExecutionById);

export default router;
