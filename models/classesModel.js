// models/classesModel.js
import db from '../database/db.js';

export const getClassesByUserCode = (userCode, callback) => {
  const query = `
    SELECT 
      Classes.codeClasses, 
      Classes.classesName, 
      Classes.gradeClasses,
      StudentClasses.note
    FROM 
        Users
    INNER JOIN 
        Students ON Users.idStudents = Students.idStudents
    INNER JOIN 
        StudentClasses ON Students.idStudents = StudentClasses.idStudents
    INNER JOIN 
        Classes ON StudentClasses.idClasses = Classes.idClasses
    WHERE 
        Users.code = 211370;
  `;

  db.all(query, [userCode], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};