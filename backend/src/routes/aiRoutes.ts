import { Router } from 'express';
import { analyzeError, optimizeCode, autoFixCode } from '../controllers/aiController';
import { optionalJWT } from '../middleware/auth';

const router = Router();

router.post('/analyze', optionalJWT, analyzeError);
router.post('/optimize', optionalJWT, optimizeCode);
router.post('/auto-fix', optionalJWT, autoFixCode);

export default router;
