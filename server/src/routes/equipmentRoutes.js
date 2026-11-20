import express from 'express';
import { 
  getEquipment, 
  getEquipmentById, 
  createEquipment, 
  updateEquipment, 
  deleteEquipment,
  toggleAvailability,
  getOwnerFleet 
} from '../controllers/equipmentController.js';
import { getEquipmentReviews, addReview } from '../controllers/reviewController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEquipment);
router.get('/owner/fleet', requireAuth, requireRole(['owner', 'admin']), getOwnerFleet);
router.get('/:id', getEquipmentById);
router.post('/', requireAuth, requireRole(['owner', 'admin']), createEquipment);
router.put('/:id', requireAuth, requireRole(['owner', 'admin']), updateEquipment);
router.patch('/:id/availability', requireAuth, requireRole(['owner', 'admin']), toggleAvailability);
router.delete('/:id', requireAuth, requireRole(['owner', 'admin']), deleteEquipment);

// Nested reviews endpoints
router.get('/:id/reviews', getEquipmentReviews);
router.post('/:id/reviews', requireAuth, addReview);

export default router;
