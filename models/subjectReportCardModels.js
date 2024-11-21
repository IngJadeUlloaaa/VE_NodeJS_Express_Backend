// models/subjectReportCardModels.js
import db from "../database/db.js";

export const getSubjectReportCardByCode = (userCode, callback) => {
    const query = `
        SELECT 
            Classes.codeClasses,
            Details.classGroup,
            Classes.classesName,
            Details.classDay,
            Details.timeClass,
            Details.classroomClass,
            Details.classroom
        FROM Users
        INNER JOIN
            Students ON Users.idStudents = Students.idStudents
        INNER JOIN 
            StudentClasses ON Students.idStudents = StudentClasses.idStudents
        INNER JOIN 
            Classes ON StudentClasses.idClasses = Classes.idClasses
        INNER JOIN
            Details ON Classes.idClasses = Details.idDetails
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