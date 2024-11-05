// server.js
import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config.js';
import userRoutes from './routes/userRoutes.js';
import classesRoutes from './routes/classesRoutes.js';

const app = express();

app.use(bodyParser.json());

// Rutas
app.use('/api/auth/users', userRoutes);

app.use('/api', classesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
