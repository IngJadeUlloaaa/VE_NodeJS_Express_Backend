// routes/userRoutes.js
import express from 'express';
import { login } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);  // Ruta para login

export default router;
