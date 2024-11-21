// controller/subjectReportCardController.js
import { getSubjectReportCardByCode } from "../models/subjectReportCardModels.js";

export const getSubjectReportCard = (req, res) => {
    const userCode = req.params.userCode; // Obtén el código del estudiante de los parámetros de la URL

    getSubjectReportCardByCode(userCode, (err, subjectReportCard) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Error retrieving subject report card.' });
        }
        if (subjectReportCard.length === 0) {
            return res.status(404).json({ message: 'No subjects report card found for this user.' });
        }
        res.status(200).json(subjectReportCard);
    });
};

