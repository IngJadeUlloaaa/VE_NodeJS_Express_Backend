// models/classesModel.js
import db from '../database/db.js';

export const getClassesByUserCode = (userCode, callback) => {
  const query = `
    SELECT 
      Classes.codeClasses, 
      Classes.classesName, 
      Classes.gradeClasses, 
      Classes.noteClasses 
    FROM 
      Classes
    INNER JOIN 
      StudentClasses ON Classes.idClasses = StudentClasses.idClasses
    INNER JOIN 
      Students ON StudentClasses.idStudents = Students.idStudents
    INNER JOIN 
      Users ON Students.idStudents = Users.idStudents
    WHERE 
      Users.code = ?;
  `;

  db.all(query, [userCode], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};
