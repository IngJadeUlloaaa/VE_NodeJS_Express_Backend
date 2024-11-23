// controller/subjectReportCardController.js
import { getSubjectReportCardByCode } from "../models/subjectReportCardModels.js";

export const getSubjectReportCard = (req, res) => {
    const userCode = req.user?.code; // Verifica que 'req.user' existe y contiene 'code'
  
    if (!userCode) {
      return res.status(400).json({ message: 'User code is required' });
    }
  
    getSubjectReportCardByCode(userCode, (err, subjectReportCard) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: 'Error retrieving subject reportCard.' });
      }
      if (!subjectReportCard || subjectReportCard.length === 0) {
        return res.status(404).json({ message: 'No subject reportCard found for this user.' });
      }
  
      res.status(200).json(subjectReportCard);
    });
  };

