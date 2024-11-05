// routes/classesRoutes.js
import express from 'express';
import { getClasses } from '../controllers/classesController.js';

const router = express.Router();

router.get('/classes/:code', getClasses);

export default router;
