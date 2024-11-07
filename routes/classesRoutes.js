// routes/classesRoutes.js
import express from 'express';
import { getClasses } from '../controllers/classesController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Aplica el middleware de autenticación para proteger la ruta
router.get('/classes', authenticateToken, getClasses);

export default router;
