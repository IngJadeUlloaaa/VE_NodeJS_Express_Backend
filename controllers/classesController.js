// controllers/classesController.js
import { getClassesByUserCode } from '../models/classesModel.js';

export const getClasses = (req, res) => {
  const userCode = req.user?.code; // Verifica que 'req.user' existe y contiene 'code'

  if (!userCode) {
    return res.status(400).json({ message: 'User code is required' });
  }

  getClassesByUserCode(userCode, (err, classes) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: 'Error retrieving classes.' });
    }
    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: 'No classes found for this user.' });
    }

    res.status(200).json(classes);
  });
};

