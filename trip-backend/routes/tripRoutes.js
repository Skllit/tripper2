// trip-backend/routes/tripRoutes.js
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

// 1) List all trips
router.get('/', getAllTrips);

// 2) *** Moved above `/:id` ***  
//    List *this user’s* enrolled trips
router.get('/enrolled', authenticate, getEnrolledTrips);

// 3) Fetch a single trip by its ObjectId
router.get('/:id', getTripById);

// ----- Admin-only routes -----
router.post('/',    authenticate, requireAdmin, createTrip);
router.put('/:id',  authenticate, requireAdmin, updateTrip);
router.delete('/:id', authenticate, requireAdmin, deleteTrip);

// 4) Public: enroll in a trip
router.post('/:id/enroll', authenticate, enrollTrip);

export default router;
