import { Router } from 'express';
import { createProject, getProjects, getProjectById, createOrUpdateFile, deleteFile, analyzeProject } from '../controllers/projectController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJWT, createProject);
router.get('/', authenticateJWT, getProjects);
router.post('/analyze', analyzeProject);
router.get('/analyze', analyzeProject);
router.get('/:id', authenticateJWT, getProjectById);
router.post('/:id/files', authenticateJWT, createOrUpdateFile);
router.delete('/:id/files/:fileId', authenticateJWT, deleteFile);

export default router;
