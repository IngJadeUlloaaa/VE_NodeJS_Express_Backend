// routes/profileRoutes.js
import express from 'express';
import { getProfile } from '../controllers/profileController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Aplica el middleware de autenticación para proteger la ruta
router.get('/profile', authenticateToken, getProfile);

export default router;
