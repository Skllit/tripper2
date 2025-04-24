import express from 'express';
import {
  getAllEnrollments,
  updateEnrollmentStatus,
  cancelEnrollment
} from '../controllers/enrollmentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
router.get('/',        authenticate, requireAdmin, getAllEnrollments);
router.put('/:id',     authenticate, requireAdmin, updateEnrollmentStatus);
router.post('/:id/cancel', authenticate, cancelEnrollment);  // ← new
export default router;
