// controllers/userController.js
import { generateTokens } from '../models/userModel.js';
import db from '../database/db.js';

// Nueva función de login
export const login = (req, res) => {
  const { code, passwd } = req.body;

  // Busca el usuario en la base de datos
  const query = `SELECT * FROM Users WHERE code = ?`;
  db.get(query, [code], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user.' });
    }
    if (!user || user.passwd !== passwd) {  // En una aplicación real, utiliza bcrypt para comparar
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Genera los tokens
    const tokens = generateTokens(user);

    // Envía los tokens al cliente
    res.status(200).json(tokens);
  });
};
