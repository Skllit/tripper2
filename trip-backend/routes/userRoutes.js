import express from 'express';
import {
  getAllUsers,
  getProfile,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// any logged-in user
router.get('/profile', authenticate, getProfile);

// admin only
router.get('/',        authenticate, requireAdmin, getAllUsers);
router.post('/',       authenticate, requireAdmin, createUser);
router.put('/:id',     authenticate, requireAdmin, updateUser);
router.delete('/:id',  authenticate, requireAdmin, deleteUser);

export default router;
