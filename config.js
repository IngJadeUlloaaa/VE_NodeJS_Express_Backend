// config.js
import dotenv from 'dotenv';
dotenv.config();


export const PORT = process.env.PORT || 3000;
export const HOST = '0.0.0.0'; // Escucha en todas las interfaces
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'hello_world';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'hello_world';
