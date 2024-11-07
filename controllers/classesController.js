// controllers/classesController.js
import { getClassesByUserCode } from '../models/classesModel.js';

export const getClasses = (req, res) => {
  const userCode = req.user.code; // Extrae el 'code' del token

  getClassesByUserCode(userCode, (err, classes) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: 'Error retrieving classes.' });
    }
    if (classes.length === 0) {
      return res.status(404).json({ message: 'No classes found for this user.' });
    }

    res.status(200).json(classes);
  });
};
