import express from 'express';
import { updateEnrollmentStatus } from '../controllers/enrollmentController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.put('/:id', authenticate, requireAdmin, updateEnrollmentStatus);

export default router;
