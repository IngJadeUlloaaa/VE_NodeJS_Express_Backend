// models/profileModel.js
import db from '../database/db.js';

export const getProfileByUserCode = (userCode, callback) => {
  const query = `
    SELECT 
        Career.careerName,
        Career.shiftCareer,
        Students.addressStudents,
        Students.phone,
        Students.names || ' ' || Students.surnames AS fullName,
        Users.code,
        Students.email
    FROM Users
    INNER JOIN Students ON Users.idStudents = Students.idStudents
    INNER JOIN Career ON Students.idCareer = Career.idCareer
    WHERE Users.code = ?;
  `;

  db.all(query, [userCode], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};