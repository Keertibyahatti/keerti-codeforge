import { Router } from 'express';
import { getProductionReadinessScore, analyzePerformance } from '../controllers/analyticsController';

const router = Router();

router.get('/readiness', getProductionReadinessScore);
router.post('/readiness', getProductionReadinessScore);
router.get('/performance', analyzePerformance);
router.post('/performance', analyzePerformance);

export default router;
