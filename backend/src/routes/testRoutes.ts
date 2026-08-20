import { Router } from 'express';
import { generateTestCases, runAllTestCases } from '../controllers/testController';

const router = Router();

router.post('/generate', generateTestCases);
router.post('/run-all', runAllTestCases);
router.post('/run', runAllTestCases);

export default router;
