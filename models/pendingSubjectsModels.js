// models/pendingSubjectsModels.js
import db from "../database/db.js";

export const getPendingSubjectsByCode = (userCode, callback) => {
    const query = `
        SELECT 
            Classes.codeClasses,
            Classes.classesName,
            Classes.gradeClasses,
            Classes.offered
        FROM Users
        INNER JOIN
            Students ON Users.idStudents = Students.idStudents
        INNER JOIN
            StudentClasses ON Students.idStudents = StudentClasses.idStudents
        INNER JOIN 
            Classes ON StudentClasses.idClasses = Classes.idClasses
        WHERE 
            Users.code = ?
        ORDER BY 
            StudentClasses.idStudentClasses DESC
        LIMIT 5;
    `;

    db.all(query, [userCode], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};
