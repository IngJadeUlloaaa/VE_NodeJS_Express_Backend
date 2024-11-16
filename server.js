// server.js
import express from 'express';
import bodyParser from 'body-parser';
import { PORT, HOST } from './config.js';
import userRoutes from './routes/userRoutes.js';
import classesRoutes from './routes/classesRoutes.js';
import pendingSubjectsRoutes from './routes/pendingSubjectsRoutes.js';

const app = express();
app.use(bodyParser.json());

// Rutas
app.use('/api/auth/users', userRoutes); 
app.use('/api', classesRoutes);            
app.use('/api', pendingSubjectsRoutes);    

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});