// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config.js';

export const authenticateToken = (req, res, next) => {
  // Obtiene el token del encabezado de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Verifica si el token existe
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  // Verifica y decodifica el token
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Si el token es válido, almacena el usuario en `req.user`
    req.user = user;
    next(); // Continúa con la siguiente función de la ruta
  });
};
