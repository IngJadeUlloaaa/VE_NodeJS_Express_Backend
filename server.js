// server.js
import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config.js';
import userRoutes from './routes/userRoutes.js';
import classesRoutes from './routes/classesRoutes.js';
import pendingSubjectsRoutes from './routes/pendingSubjectsRoutes.js';

const app = express();

app.use(bodyParser.json());

// Rutas
app.use('/api/auth/users', userRoutes);    // Ruta para autenticación de usuarios
app.use('/api', classesRoutes);     // Ruta para clases
app.use('/api', pendingSubjectsRoutes);  // Ruta para pending subjects

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});