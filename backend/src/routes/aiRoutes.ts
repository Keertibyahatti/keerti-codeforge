import { Router } from 'express';
import { analyzeError, optimizeCode } from '../controllers/aiController';
import { optionalJWT } from '../middleware/auth';

const router = Router();

router.post('/analyze', optionalJWT, analyzeError);
router.post('/optimize', optionalJWT, optimizeCode);

export default router;
