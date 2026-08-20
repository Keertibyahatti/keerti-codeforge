import { Router } from 'express';
import { getInterviewProblems, submitInterviewSolution } from '../controllers/interviewController';

const router = Router();

router.get('/problems', getInterviewProblems);
router.post('/submit', submitInterviewSolution);

export default router;
