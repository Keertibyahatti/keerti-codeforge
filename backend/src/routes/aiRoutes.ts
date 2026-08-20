import { Router } from 'express';
import { analyzeError, optimizeCode, autoFixCode, redebugCode } from '../controllers/aiController';
import { optionalJWT } from '../middleware/auth';

const router = Router();

router.post('/analyze', optionalJWT, analyzeError);
router.post('/optimize', optionalJWT, optimizeCode);
router.post('/auto-fix', optionalJWT, autoFixCode);
router.post('/repair', optionalJWT, autoFixCode);
router.post('/redebug', optionalJWT, redebugCode);

export default router;
