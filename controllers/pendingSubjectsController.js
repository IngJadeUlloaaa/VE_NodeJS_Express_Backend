// controller/pendingSubjectsController.js
import { getPendingSubjectsByCode } from "../models/pendingSubjectsModels.js";

export const getPendingSubjects = (req, res) => {
    const userCode = req.user?.code; // Verifica que 'req.user' existe y contiene 'code'
  
    if (!userCode) {
      return res.status(400).json({ message: 'User code is required' });
    }
  
    getPendingSubjectsByCode(userCode, (err, pendingSubjects) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: 'Error retrieving pendingSubjects.' });
      }
      if (!pendingSubjects || pendingSubjects.length === 0) {
        return res.status(404).json({ message: 'No pendingSubjects found for this user.' });
      }
  
      res.status(200).json(pendingSubjects);
    });
  };