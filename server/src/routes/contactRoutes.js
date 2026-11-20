import express from 'express';
import { submitContactMessage, getContactMessages } from '../controllers/contactController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContactMessage);
router.get('/', requireAuth, requireRole(['admin']), getContactMessages);

export default router;
