import express from 'express';
import {
  getAllTrips,
  getEnrolledTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  enrollTrip
} from '../controllers/tripController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/',            getAllTrips);
router.get('/enrolled',    authenticate, getEnrolledTrips);
router.get('/:id',         getTripById);

router.post('/',           authenticate, requireAdmin, createTrip);
router.put('/:id',         authenticate, requireAdmin, updateTrip);
router.delete('/:id',      authenticate, requireAdmin, deleteTrip);

router.post('/:id/enroll', authenticate, enrollTrip);

export default router;
