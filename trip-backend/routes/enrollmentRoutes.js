import express from 'express';
import {
  getAllEnrollments,
  updateEnrollmentStatus
} from '../controllers/enrollmentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin can list every enrollment
router.get('/', authenticate, requireAdmin, getAllEnrollments);

// Admin can approve/reject
router.put('/:id', authenticate, requireAdmin, updateEnrollmentStatus);

export default router;
