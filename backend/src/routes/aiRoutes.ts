import { Router } from 'express';
import { analyzeError, optimizeCode, autoFixCode, redebugCode, chatWithAIController, generateMultiLangController, generateCodeFromPromptController } from '../controllers/aiController';
import { optionalJWT } from '../middleware/auth';

const router = Router();

router.post('/analyze', optionalJWT, analyzeError);
router.post('/optimize', optionalJWT, optimizeCode);
router.post('/auto-fix', optionalJWT, autoFixCode);
router.post('/repair', optionalJWT, autoFixCode);
router.post('/redebug', optionalJWT, redebugCode);

// AI Chatbot, Multi-Lang & Prompt-to-Code Generator Routes
router.post('/chat', optionalJWT, chatWithAIController);
router.post('/generate-multi-lang', optionalJWT, generateMultiLangController);
router.post('/generate-code', optionalJWT, generateCodeFromPromptController);

export default router;
