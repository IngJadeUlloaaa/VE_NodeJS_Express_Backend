import bcrypt from 'bcrypt';
import { generateTokens } from '../models/userModel.js';
import db from '../database/db.js';

// Nueva función de login
export const login = (req, res) => {
  const { code, passwd } = req.body;

  // Busca el usuario en la base de datos
  const query = `SELECT * FROM Users WHERE code = ?`;
  db.get(query, [code], async (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error retrieving user.' });
    }
  
    if (!user) {
      console.error('User not found for code:', code);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    console.log('Retrieved user:', user);
  
    const match = await bcrypt.compare(passwd, user.passwd);
    if (!match) {
      console.error('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const tokens = generateTokens(user);
    res.status(200).json(tokens);
  });  
};