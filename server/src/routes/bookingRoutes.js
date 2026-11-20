import express from 'express';
import { 
  createBooking, 
  getMyBookings, 
  getOwnerBookings, 
  updateBookingStatus 
} from '../controllers/bookingController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, createBooking);
router.get('/my', requireAuth, getMyBookings);
router.get('/owner', requireAuth, requireRole(['owner', 'admin']), getOwnerBookings);
router.patch('/:id/status', requireAuth, requireRole(['owner', 'admin']), updateBookingStatus);

export default router;
