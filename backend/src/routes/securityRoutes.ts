import { Router } from 'express';
import { runSecurityScan, fixSecurityVulnerability } from '../controllers/securityController';

const router = Router();

router.post('/scan', runSecurityScan);
router.post('/fix', fixSecurityVulnerability);

export default router;
