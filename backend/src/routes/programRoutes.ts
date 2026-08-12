import { Router } from 'express';
import { createProgram, getPrograms, getProgramById, updateProgram, deleteProgram, duplicateProgram } from '../controllers/programController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.use(authenticateJWT);

router.post('/', createProgram);
router.get('/', getPrograms);
router.get('/:id', getProgramById);
router.put('/:id', updateProgram);
router.delete('/:id', deleteProgram);
router.post('/:id/duplicate', duplicateProgram);

export default router;
