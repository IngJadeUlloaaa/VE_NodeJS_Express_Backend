// routes/pendingSubjectsRoutes.js
import express from 'express';
import { getPendingSubjects } from '../controllers/pendingSubjectsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Usa ':userCode/pendingSubjects' para que la URL incluya el código del usuario
router.get('/pendingSubjects', authenticateToken, getPendingSubjects);

export default router;
