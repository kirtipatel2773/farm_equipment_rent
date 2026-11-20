import express from 'express';
import { getOwnerStats, getFarmerStats, getPlatformStats } from '../controllers/statsController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/platform', getPlatformStats);
router.get('/owner', requireAuth, requireRole(['owner', 'admin']), getOwnerStats);
router.get('/farmer', requireAuth, getFarmerStats);

export default router;
