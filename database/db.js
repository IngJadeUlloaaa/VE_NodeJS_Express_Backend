// database/db.js
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'university.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Crear tablas si no existen 
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Career (
      idCareer INTEGER PRIMARY KEY AUTOINCREMENT,
      careerName TEXT NOT NULL,
      shiftCareer TEXT NOT NULL
    )
  `);

  // Insertar registros en Career
  db.run(`INSERT INTO Career (careerName, shiftCareer) VALUES (?, ?)`, 
  ['Systems Engineering', 'Morning']);

  db.run(`
    DELETE FROM Career
    WHERE idCareer NOT IN (
      SELECT MIN(idCareer)
      FROM Career
      GROUP BY careerName, shiftCareer
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Students (
      idStudents INTEGER PRIMARY KEY AUTOINCREMENT,
      names TEXT NOT NULL,
      surnames TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      addressStudent TEXT NOT NULL,
      shiftStudent TEXT NOT NULL,
      idCareer INTEGER NOT NULL,
      FOREIGN KEY (idCareer) REFERENCES Career(idCareer)
    )
  `);

  // Insertar registros en Students
  const students = [
      ['Carlos Enrique', 'Ulloa Martinez', '+50588638578', 'carlos.ulloa211572@udem.edu.ni', 'Altagracia Neighborhood', 'Morning', 1],
      ['Jonathan', 'Garcia Lopez', '+50576929022', 'jonathan.garcia211370@udem.edu.ni', 'San Isidro Neighborhood', 'Morning', 1]
  ];
  students.forEach(student => {
      db.run(`INSERT INTO Students (names, surnames, phone, email, addressStudent, shiftStudent, idCareer) VALUES (?, ?, ?, ?, ?, ?, ?)`, student);
  });
  db.run(`
    DELETE FROM Students
    WHERE idStudents NOT IN (
      SELECT MIN(idStudents)
      FROM Students
      GROUP BY names, surnames, phone, email, addressStudent, shiftStudent, idCareer
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Classes (
      idClasses INTEGER PRIMARY KEY AUTOINCREMENT,
      codeClasses TEXT NOT NULL,
      classesName TEXT NOT NULL,
      gradeClasses INTEGER NOT NULL,
      noteClasses TEXT NOT NULL,
      idCareer INTEGER NOT NULL,
      FOREIGN KEY (idCareer) REFERENCES Career(idCareer)
    )
  `);

  // Insªertar registros en Classes
  const classes = [
    ['FI-102', 'INTRODUCTION TO ENGINEERING', 1, 'A', 1],
    ['FE-101', 'GENERAL MANAGEMENT', 1, 'A', 1],
    ['FB-127', 'WRITTEN EXPRESSION', 1, 'A', 1],
    ['FB-103', 'BASIC MATHEMATICS', 1, 'A', 1],
    ['FB-129', 'BASIC INFORMATICS', 1, 'A', 1],
    ['FE-260', 'ACCOUNTING', 2, 'A', 1],
    ['FB-130', 'APPLIED COMPUTER SCIENCE', 2, 'A', 1],
    ['FB-128', 'ORAL EXPRESSION', 2, 'A', 1],
    ['FI-108', 'MECHANICS', 2, 'A', 1],
    ['FI-246', 'BASIC COMPUTER DRAWING', 2, 'A', 1],
    ['FI-191', 'ELECTRICITY AND ELECTROMAGNETISM', 3, 'A', 1],
    ['FI-248', 'FLOW DIAGRAMS', 3, 'A', 1],
    ['FI-110', 'DESCRIPTIVE STATISTICS', 3, 'A', 1],
    ['FB-111', 'DISCRETE MATHEMATICS', 3, 'A', 1],
    ['FI-247', 'APPLIED COMPUTER DRAWING', 3, 'A', 1],
    ['FI-193', 'BASIC ELECTRONICS', 4, 'A', 1],
    ['FI-163', 'NETWORKS AND COMMUNICATIONS', 4, 'A', 1],
    ['FI-114', 'INFERENTIAL STATISTICS', 4, 'A', 1],
    ['FB-139', 'DIFFERENTIAL CALCULUS', 4, 'A', 1],
    ['FI-249', 'LOGIC ALGORITHMS', 4, 'A', 1],
    ['FI-168', 'GRAPHIC DESIGN', 5, 'A', 1],
    ['FI-214', 'OPERATING SYSTEM', 5, 'A', 1],
    ['FI-213', 'FUNDAMENTALS OF WEB DEVELOPMENT', 5, 'A', 1],
    ['FB-140', 'INTEGRAL CALCULUS', 5, 'A', 1],
    ['FI-192', 'PROGRAMMING', 5, 'A', 1],
    ['FI-243', 'APPLIED NETWORKS AND COMMUNICATIONS', 6, 'A', 1],
    ['FI-215', 'WEB DEVELOPMENT IN CLIENT ENVIRONMENT', 6, 'A', 1],
    ['FI-125', 'DATA BASE', 6, 'A', 1],
    ['FI-239', 'APPLIED PROGRAMMING', 6, 'A', 1],
    ['FE-105', 'COST ACCOUNTING', 6, 'A', 1],
    ['FI-217', 'WEB DEVELOPMENT IN SERVER ENVIRONMENT', 7, 'A', 1],
    ['FI-134', 'OBJECT ORIENTED PROGRAMMING', 7, 'A', 1],
    ['FI-240', 'DISTRIBUTED OPERATING SYSTEM', 7, 'A', 1],
    ['FI-216', 'DISTRIBUTED DATABASE', 7, 'A', 1],
    ['FI-242', 'SYSTEMS ANALYSIS AND DESIGN', 7, 'A', 1],
    ['FI-185', 'DATABASE PROGRAMMING', 8, 'A', 1],
    ['FI-218', 'WEB DEVELOPMENT WORKSHOP IN CLIENT ENVIRONMENT', 8, 'A', 1],
    ['FI-219', 'DATABASE MANAGEMENT ON THE WEB', 8, 'A', 1],
    ['FI-122', 'MULTIMEDIA AND VIRTUAL REALITY', 8, 'A', 1],
    ['FI-190', 'OBJECT ORIENTED SYSTEMS ANALYSIS AND DESIGN', 8, 'A', 1],
    ['FB-118', 'RESEARCH METHODOLOGY', 9, 'A', 1],
    ['FI-220', 'SERVER-SIDE WEB DEVELOPMENT WORKSHOP', 9, 'A', 1],
    ['FE-116', 'MANAGEMENT ACCOUNTING', 9, 'A', 1],
    ['FI-221', 'SOFTWARE ENGINEERING', 9, 'A', 1],
    ['FI-184', 'DATABASE ADMINISTRATION', 9, 'A', 1],
    ['FI-235', 'OPTIMIZATION', 10, 'A', 1],
    ['FI-145', 'ARTIFICIAL INTELLIGENCE', 10, 'A', 1],
    ['FI-115', 'ECONOMIC ENGINEERING', 10, 'A', 1],
    ['FI-152', 'SYSTEMS AUDITING', 10, 'A', 1],
    ['FI-222', 'WEB ENGINEERING', 10, 'A', 1],
    ['FB-112', 'WORK STUDY', 11, 'A', 1],
    ['FE-210', 'STRATEGIC MANAGEMENT', 11, 'A', 1],
    ['FI-187', 'SOFTWARE PROJECT MANAGEMENT', 11, 'A', 1],
    ['FE-164', 'PROJECT FORMULATION AND EVALUATION', 11, 'A', 1],
    ['FI-166', 'EXPERT SYSTEMS', 11, 'A', 1],
    ['FI-150', 'SYSTEMS SIMULATION', 12, 'A', 1],
    ['FB-137', 'ENVIRONMENTAL MANAGEMENT', 12, 'A', 1],
    ['FI-224', 'DEVELOPMENT OF INTELLIGENT SYSTEMS', 12, 'A', 1],
    ['FI-225', 'MOBILE APPLICATIONS PROGRAMMING', 12, 'A', 1]
  ];
  classes.forEach(clas => {
    db.run(`INSERT INTO Classes (codeClasses, classesName, gradeClasses, noteClasses, idCareer) VALUES (?, ?, ?, ?, ?)`, clas);
  });
  // Eliminar duplicados en la tabla Classes
  db.run(`
    DELETE FROM Classes
    WHERE idClasses NOT IN (
      SELECT MIN(idClasses)
      FROM Classes
      GROUP BY codeClasses, classesName, gradeClasses, noteClasses, idCareer
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
    idUsers INTEGER PRIMARY KEY AUTOINCREMENT,
    code INTEGER NOT NULL,
    passwd TEXT NOT NULL,
    idStudents INTEGER NOT NULL,
    FOREIGN KEY (idStudents) REFERENCES Students(idStudents)
    )
  `);

  const users = [
    [211572, '12345', 1],
    [211370, '12345', 2]
  ]
  users.forEach(user => {
    db.run(`INSERT INTO Users(code, passwd, idStudents) VALUES (?, ?, ?)`, user);
  })
  // Eliminar duplicados en la tabla Users
  db.run(`
    DELETE FROM Users
    WHERE idUsers NOT IN (
      SELECT MIN(idUsers)
      FROM Users
      GROUP BY code, passwd, idStudents
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS StudentClasses (
      idStudentClasses INTEGER PRIMARY KEY AUTOINCREMENT,
      idStudents INTEGER NOT NULL,
      idClasses INTEGER NOT NULL,
      enrollmentDate TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (idStudents) REFERENCES Students(idStudents),
      FOREIGN KEY (idClasses) REFERENCES Classes(idClasses)
    )
  `);

  const studentClasses = [
    [1, 1], // Carlos Enrique en INTRODUCTION TO ENGINEERING
    [1, 2], // Carlos Enrique en GENERAL MANAGEMENT
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
    [1, 10],
    [1, 11],
    [1, 12],
    [1, 13],
    [1, 14],
    [1, 15],
    [1, 16],
    [1, 17],
    [1, 18],
    [1, 19],
    [1, 20],
    [1, 21],
    [1, 22],
    [1, 23],
    [1, 24],
    [1, 25],
    [1, 26],
    [1, 27],
    [1, 28],
    [1, 29],
    [1, 30],
    [1, 31],
    [1, 32],
    [1, 33],
    [1, 34],
    [1, 35],
    [1, 36],
    [1, 37],
    [1, 38],
    [1, 39],
    [1, 40],
    [1, 41],
    [1, 42],
    [1, 43],
    [1, 44],
    [1, 45],
    [1, 46],
    [1, 47],
    [1, 48],
    [1, 49],
    [1, 50],
    [1, 51],
    [1, 52],
    [1, 53],
    [1, 54],
    [1, 55],
    [1, 56],
    [1, 57],
    [1, 58],
    [1, 59],
    [1, 60],
    [2, 1], // Jonathan en INTRODUCTION TO ENGINEERING
    [2, 2],  // Jonathan en GENERAL MANAGEMENT
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 7],
    [2, 8],
    [2, 9],
    [2, 10],
    [2, 11],
    [2, 12],
    [2, 13],
    [2, 14],
    [2, 15],
    [2, 16],
    [2, 17],
    [2, 18],
    [2, 19],
    [2, 20],
    [2, 21],
    [2, 22],
    [2, 23],
    [2, 24],
    [2, 25],
    [2, 26],
    [2, 27],
    [2, 28],
    [2, 29],
    [2, 30],
    [2, 31],
    [2, 32],
    [2, 33],
    [2, 34],
    [2, 35],
    [2, 36],
    [2, 37],
    [2, 38],
    [2, 39],
    [2, 40],
    [2, 41],
    [2, 42],
    [2, 43],
    [2, 44],
    [2, 45],
    [2, 46],
    [2, 47],
    [2, 48],
    [2, 49],
    [2, 50],
    [2, 51],
    [2, 52],
    [2, 53],
    [2, 54],
    [2, 55],
    [2, 56],
    [2, 57],
    [2, 58],
    [2, 59],
    [2, 60]
  ];
  studentClasses.forEach(sc => {
      db.run(`INSERT INTO StudentClasses (idStudents, idClasses) VALUES (?, ?)`, sc);
  });
  // Eliminar duplicados en la tabla StudentClasses
  db.run(`
    DELETE FROM StudentClasses
    WHERE idStudentClasses NOT IN (
      SELECT MIN(idStudentClasses)
      FROM StudentClasses
      GROUP BY idStudents, idClasses, enrollmentDate
    );
  `);
  console.log('Duplicados eliminados en todas las tablas.');
  console.log("Datos insertados correctamente");
});

export default db;
