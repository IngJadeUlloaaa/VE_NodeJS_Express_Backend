// controller/pendingSubjectsController.js
import { getPendingSubjectsByCode } from "../models/pendingSubjectsModels.js";

export const getPendingSubjects = (req, res) => {
    const userCode = req.params.userCode; // Obtén el código del estudiante de los parámetros de la URL

    getPendingSubjectsByCode(userCode, (err, pendingSubjects) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Error retrieving pending subjects.' });
        }
        if (pendingSubjects.length === 0) {
            return res.status(404).json({ message: 'No pending subjects found for this user.' });
        }
        res.status(200).json(pendingSubjects);
    });
};