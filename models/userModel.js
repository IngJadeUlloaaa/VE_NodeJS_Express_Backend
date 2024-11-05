// models/userModel.js
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config.js';

// Función para generar los tokens
export const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.idUsers, code: user.code },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.idUsers, code: user.code },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};
