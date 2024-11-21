// routes/subjectReportCardRoutes.js
import express from 'express';
import { getSubjectReportCard } from '../controllers/subjectReportCardControllers.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Usa ':userCode/subjectReportCardRoutes' para que la URL incluya el código del usuario
router.get('/:userCode/subjectReportCard', authenticateToken, getSubjectReportCard);

export default router;
