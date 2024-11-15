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

  /* ========================== CAREER ============================*/
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Career (
      idCareer INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      careerName VARCHAR(100) NOT NULL,
      shiftCareer VARCHAR(100) NOT NULL
    );
  `);

  // Insert datas from career
  db.run(`INSERT INTO Career (careerName, shiftCareer) VALUES (?, ?)`, 
  ['Systems Engineering', 'Morning']);

  // delete duplicate from career
  db.run(`
    DELETE FROM Career
    WHERE idCareer NOT IN (
      SELECT MIN(idCareer)
      FROM Career
      GROUP BY careerName, shiftCareer
    );
  `);

  /* ============================ DETAILS ============================*/
  db.run(`
    CREATE TABLE IF NOT EXISTS Details (
      idDetails INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      classDay VARCHAR(100) NOT NULL,
      timeClass VARCHAR(100) NOT NULL,
      classroomClass VARCHAR(100) NOT NULL,
      classroom VARCHAR(100) NOT NULL
    );
  `);

  // Insert datas from details
  const details = [
    ['Thursday', '08:30 am', 'A02', 'sd8kjdf'],
    ['Thursday', '10:00 am', 'A15', 'asdf3l0'],
    ['Thursday', '11:40 am', 'A06', 'vxc4fdf'],
    ['Thursday', '01:15 pm', 'A30', 'svf5h5h'],
    ['Thursday', '03:00 pm', 'L02', 'kl9jkkm'],
    ['Thursday', '08:30 am', 'A04', 'ioruwe9'],
    ['Thursday', '10:00 am', 'L02', 'poinf43'],
    ['Thursday', '11:40 am', 'A06', 'vcxz3sz'],
    ['Thursday', '01:15 pm', 'A14', 'pll0kf3'],
    ['Thursday', '03:00 pm', 'L04', 'opoñ34r'],
    ['Thursday', '08:30 am', 'A08', 'sdf3ftt'],
    ['Thursday', '10:00 am', 'A03', 'ijfkjsf'],
    ['Thursday', '11:40 am', 'A12', 'ksja2kf'],
    ['Thursday', '01:15 pm', 'A16', 'bneuqp0'],
    ['Thursday', '03:00 pm', 'L05', '0kd8mne'],
    ['Tuesday', '08:30 am', 'A16', 'asfd3f3'],
    ['Tuesday', '10:15 am', 'L04', 'jjkh32f'],
    ['Thursday', '08:30 am', 'A02', 'sxnvc33'],
    ['Thursday', '10:15 am', 'A02', 'ksd22kl'],
    ['Friday', '08:30 am', 'A04', 'lsdqq1d'],
    ['Tuesday', '08:30 am', 'L02', 'njj2j3j'],
    ['Tuesday', '10:15 am', 'L04', 'buh3y1u'],
    ['Thursday', '08:30 am', 'L05', 'df9sd9'],
    ['Thursday', '10:15 am', 'A06', 'v8sa8sv'],
    ['Friday', '08:30 am', 'L03', 'qwert2f'],
    ['Tuesday', '08:30 am', 'L04', 'nv3jd9'],
    ['Tuesday', '10:15 am', 'L05', 'm3mm30'],
    ['Thursday', '08:30 am', 'L03', 'vd4t5r2'],
    ['Thursday', '10:15 am', 'L04', 'qaxs2ds'],
    ['Friday', '08:30 am', 'A30', 'opjc3nij'],
    ['Tuesday', '08:30 am', 'L04', 'rfoir4'],
    ['Tuesday', '10:15 am', 'L05', 'dfsgm4'],
    ['Thursday', '08:30 am', 'L03', 'safsam3'],
    ['Thursday', '10:15 am', 'L04', 'saadee3'],
    ['Friday', '08:30 am', 'L04', 'asacc3'],
    ['Tuesday', '08:30 am', 'L06', 'fsdv4f'],
    ['Tuesday', '10:15 am', 'L05', 'vfem2k2'],
    ['Thursday', '08:30 am', 'L02', 'sdclm22'],
    ['Thursday', '10:15 am', 'L04', 'sdmklm3'],
    ['Friday', '08:30 am', 'L03', 'qwerf33'],
    ['Tuesday', '08:30 am', 'A06', 'jsnc3km'],
    ['Tuesday', '10:15 am', 'L05', 'qewer3e'],
    ['Thursday', '08:30 am', 'A14', 'vsdvdv4'],
    ['Thursday', '10:15 am', 'L06', 'kmsmd9'],
    ['Friday', '08:30 am', 'L04', 'sdo3okd'],
    ['Sunday', '08:30 am', 'L11', 'sakkd9m'],
    ['Sunday', '10:00 am', 'L06', 'sansdn3'],
    ['Sunday', '11:40 am', 'A45', 'sdakfj3'],
    ['Sunday', '01:15 pm', 'L14', 'sado22k'],
    ['Sunday', '03:00 pm', 'L05', 'ascmne2'],
    ['Sunday', '08:30 am', 'A04', 'sdfasd3'],
    ['Sunday', '10:00 am', 'A18', 'vsdve3d'],
    ['Sunday', '11:40 am', 'A40', 'sdf7sdm'],
    ['Sunday', '01:15 pm', 'A40', 'jsdn5hb'],
    ['Sunday', '03:00 pm', 'L05', 'oai9kds'],
    ['Sunday', '08:30 am', 'A16', 'sdfasd3'],
    ['Sunday', '10:00 am', 'A06', 'vsdve3d'],
    ['Sunday', '11:40 am', 'L11', 'sdf7sdm'],
    ['Sunday', '01:15 pm', 'L02', 'jsdn5hb'],
    ['Sunday', '03:00 pm', 'A16', 'oai9kds']
  ];
  details.forEach(detail => {
    db.run(`INSERT INTO Details (classDay, timeClass, classroomClass, classroom) VALUES (?, ?, ?, ?)`, detail);
  });

  // delete duplicate detail
  db.run(`
    DELETE FROM Details
    WHERE idDetails NOT IN (
      SELECT MIN(idDetails)
      FROM Details
      GROUP BY classDay, timeClass, classroomClass, classroom
    );
  `);

  /* ============================ CLASSES ============================*/
  db.run(`
    CREATE TABLE IF NOT EXISTS Classes (
      idClasses INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      codeClasses VARCHAR(100) NOT NULL,
      classesName VARCHAR(100) NOT NULL,
      gradeClasses VARCHAR(100) NOT NULL,
      idCareer INTEGER,
      offered VARCHAR(100) NOT NULL,
      FOREIGN KEY (idCareer) REFERENCES Career (idCareer) ON DELETE CASCADE
    );
  `);

  // Insertar registros en Classes
  const classes = [
    ['FI-102', 'Introduction to Engineering', 1, 1, 'Morning'],
    ['FE-101', 'General Management', 1, 1, 'Morning'],
    ['FB-127', 'Written Expression', 1, 1, 'Morning'],
    ['FB-103', 'Basic Mathematics', 1, 1, 'Morning'],
    ['FB-129', 'Basic Informatics', 1, 1, 'Morning'],
    ['FE-260', 'Accounting', 2, 1, 'Morning'],
    ['FB-130', 'Applied Computer Science', 2, 1, 'Morning'],
    ['FB-128', 'Oral Expression', 2, 1, 'Morning'],
    ['FI-108', 'Mechanics', 2, 1, 'Morning'],
    ['FI-246', 'Basic Computer Drawing', 2, 1, 'Morning'],
    ['FI-191', 'Electricity and Electromagnetism', 3, 1, 'Morning'],
    ['FI-248', 'Flow Diagrams', 3, 1, 'Morning'],
    ['FI-110', 'Descriptive Statistics', 3, 1, 'Morning'],
    ['FB-111', 'Discrete Mathematics', 3, 1, 'Morning'],
    ['FI-247', 'Applied Computer Drawing', 3, 1, 'Morning'],
    ['FI-193', 'Basic Electronics', 4, 1, 'Morning'],
    ['FI-163', 'Networks and Communications', 4, 1, 'Morning'],
    ['FI-114', 'Inferential Statistics', 4, 1, 'Morning'],
    ['FB-139', 'Differential Calculus', 4, 1, 'Morning'],
    ['FI-249', 'Logic Algorithms', 4, 1, 'Morning'],
    ['FI-168', 'Graphic Design', 5, 1, 'Morning'],
    ['FI-214', 'Operating System', 5, 1, 'Morning'],
    ['FI-213', 'Fundamentals of Web Development', 5, 1, 'Morning'],
    ['FB-140', 'Integral Calculus', 5, 1, 'Morning'],
    ['FI-192', 'Programming', 5, 1, 'Morning'],
    ['FI-243', 'Applied Networks and Communications', 6, 1, 'Morning'],
    ['FI-215', 'Web Development in Client Environment', 6, 1, 'Morning'],
    ['FI-125', 'Database', 6, 1, 'Morning'],
    ['FI-239', 'Applied Programming', 6, 1, 'Morning'],
    ['FE-105', 'Cost Accounting', 6, 1, 'Morning'],
    ['FI-217', 'Web Development in Server Environment', 7, 1, 'Morning'],
    ['FI-134', 'Object-Oriented Programming', 7, 1, 'Morning'],
    ['FI-240', 'Distributed Operating System', 7, 1, 'Morning'],
    ['FI-216', 'Distributed Database', 7, 1, 'Morning'],
    ['FI-242', 'Systems Analysis and Design', 7, 1, 'Morning'],
    ['FI-185', 'Database Programming', 8, 1, 'Morning'], //here
    ['FI-218', 'Web Development Workshop in Client Environment', 8, 1, 'Morning'],
    ['FI-219', 'Database Management on the Web', 8, 1, 'Morning'],
    ['FI-122', 'Multimedia and Virtual Reality', 8, 1, 'Morning'],
    ['FI-190', 'Object-Oriented Systems Analysis and Design', 8, 1, 'Morning'],
    ['FB-118', 'Research Methodology', 9, 1, 'Morning'],
    ['FI-220', 'Server-Side Web Development Workshop', 9, 1, 'Morning'],
    ['FE-116', 'Management Accounting', 9, 1, 'Morning'],
    ['FI-221', 'Software Engineering', 9, 1, 'Morning'],
    ['FI-184', 'Database Administration', 9, 1, 'Morning'],
    ['FI-235', 'Optimization', 10, 1, 'Morning'],
    ['FI-145', 'Artificial Intelligence', 10, 1, 'Morning'],
    ['FI-115', 'Economic Engineering', 10, 1, 'Morning'],
    ['FI-152', 'Systems Auditing', 10, 1, 'Morning'],
    ['FI-222', 'Web Engineering', 10, 1, 'Morning'],
    ['FB-112', 'Work Study', 11, 1, 'Morning'],
    ['FE-210', 'Strategic Management', 11, 1, 'Morning'],
    ['FI-187', 'Software Project Management', 11, 1, 'Morning'],
    ['FE-164', 'Project Formulation and Evaluation', 11, 1, 'Morning'],
    ['FI-166', 'Expert Systems', 11, 1, 'Morning'],
    ['FI-150', 'Systems Simulation', 12, 1, 'Morning'],
    ['FB-137', 'Environmental Management', 12, 1, 'Morning'],
    ['FI-224', 'Development of Intelligent Systems', 12, 1, 'Morning'],
    ['FI-225', 'Mobile Applications Programming', 12, 1, 'Morning'],
    ['FI-226', 'Implementation of IT Projects', 12, 1, 'Morning']
  ];
  classes.forEach(clas => {
    db.run(`INSERT INTO Classes (codeClasses, classesName, gradeClasses, idCareer, offered) VALUES (?, ?, ?, ?, ?)`, clas);
  });

  // remove duplicate classes
  db.run(`
    DELETE FROM Classes
    WHERE idClasses NOT IN (
      SELECT MIN(idClasses)
      FROM Classes
      GROUP BY codeClasses, classesName, noteClasses, offered, idCareer
    );
  `);

  /* ========================== STUDENTCLASSES =========================*/
  db.run(`
    CREATE TABLE IF NOT EXISTS StudentClasses (
      idStudentClasses INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      idStudents INTEGER,
      idClasses INTEGER,
      note VARCHAR(1),
      enrollmentDate TEXT,
      FOREIGN KEY (idClasses) REFERENCES Classess (idClassess),
      FOREIGN KEY (idStudents) REFERENCES Students (idStudents)
    );
  `);

  const studentClasses = [
    [1, 1, 'A'],
    [1, 2, 'A'],
    [1, 3, 'A'],
    [1, 4, 'A'],
    [1, 5, 'A'],
    [1, 6, 'A'],
    [1, 7, 'A'],
    [1, 8, 'A'],
    [1, 9, 'A'],
    [1, 10, 'A'],
    [1, 11, 'A'],
    [1, 12, 'A'],
    [1, 13, 'A'],
    [1, 14, 'A'],
    [1, 15, 'A'],
    [1, 16, 'A'],
    [1, 17, 'A'],
    [1, 18, 'A'],
    [1, 19, 'A'],
    [1, 20, 'A'],
    [1, 21, 'A'],
    [1, 22, 'A'],
    [1, 23, 'A'],
    [1, 24, 'A'],
    [1, 25, 'A'],
    [1, 26, 'A'],
    [1, 27, 'A'],
    [1, 28, 'A'],
    [1, 29, 'A'],
    [1, 30, 'A'],
    [1, 31, 'A'],
    [1, 32, 'A'],
    [1, 33, 'A'],
    [1, 34, 'A'],
    [1, 35, 'A'],
    [1, 36, 'A'],
    [1, 37, 'A'],
    [1, 38, 'A'],
    [1, 39, 'A'],
    [1, 40, 'A'],
    [1, 41, 'A'],
    [1, 42, 'A'],
    [1, 43, 'A'],
    [1, 44, 'A'],
    [1, 45, 'A'],
    [1, 46, 'A'],
    [1, 47, 'A'],
    [1, 48, 'A'],
    [1, 49, 'A'],
    [1, 50, 'A'],
    [1, 51, 'A'],
    [1, 52, 'A'],
    [1, 53, 'A'],
    [1, 54, 'A'],
    [1, 55, 'A'],
    [1, 56, ''],
    [1, 57, ''],
    [1, 58, ''],
    [1, 59, ''],
    [1, 60, ''],
    [2, 1, 'A'],
    [2, 2, 'A'],
    [2, 3, 'A'],
    [2, 4, 'A'],
    [2, 5, 'A'],
    [2, 6, 'A'],
    [2, 7, 'A'],
    [2, 8, 'A'],
    [2, 9, 'A'],
    [2, 10, 'A'],
    [2, 11, 'A'],
    [2, 12, 'A'],
    [2, 13, 'A'],
    [2, 14, 'A'],
    [2, 15, 'A'],
    [2, 16, 'A'],
    [2, 17, 'A'],
    [2, 18, 'A'],
    [2, 19, 'A'],
    [2, 20, 'A'],
    [2, 21, 'A'],
    [2, 22, 'A'],
    [2, 23, 'A'],
    [2, 24, 'A'],
    [2, 25, 'A'],
    [2, 26, 'A'],
    [2, 27, 'A'],
    [2, 28, 'A'],
    [2, 29, 'A'],
    [2, 30, 'A'],
    [2, 31, 'A'],
    [2, 32, 'A'],
    [2, 33, 'A'],
    [2, 34, 'A'],
    [2, 35, 'A'],
    [2, 35, ''], // here
    [2, 37, 'A'],
    [2, 38, 'A'],
    [2, 39, 'A'],
    [2, 40, 'A'],
    [2, 41, 'A'],
    [2, 42, 'A'],
    [2, 43, 'A'],
    [2, 44, 'A'],
    [2, 45, 'A'],
    [2, 46, 'A'],
    [2, 47, 'A'],
    [2, 48, 'A'],
    [2, 49, 'A'],
    [2, 50, 'A'],
    [2, 51, 'A'],
    [2, 52, 'A'],
    [2, 53, 'A'],
    [2, 54, 'A'],
    [2, 55, 'A'],
    [2, 56, ''],
    [2, 57, ''],
    [2, 58, ''],
    [2, 59, ''],
    [2, 60, ''],
    [3, 1, 'A'], 
    [3, 2, 'A'],
    [3, 3, 'A'],
    [3, 4, 'A'],
    [3, 5, 'A'],
    [3, 6, 'A'],
    [3, 7, 'A'],
    [3, 8, 'A'],
    [3, 9, 'A'],
    [3, 10, 'A'],
    [3, 11, 'A'],
    [3, 12, 'A'],
    [3, 13, 'A'],
    [3, 14, 'A'],
    [3, 15, 'A'],
    [3, 16, 'A'],
    [3, 17, 'A'],
    [3, 18, 'A'],
    [3, 19, 'A'],
    [3, 20, 'A'],
    [3, 21, 'A'],
    [3, 22, 'A'],
    [3, 23, 'A'],
    [3, 24, 'A'],
    [3, 25, 'A'],
    [3, 26, 'A'],
    [3, 27, 'A'],
    [3, 28, 'A'],
    [3, 29, 'A'],
    [3, 30, 'A'],
    [3, 31, 'A'],
    [3, 32, 'A'],
    [3, 33, 'A'],
    [3, 34, 'A'],
    [3, 35, 'A'],
    [3, 36, 'A'],
    [3, 37, 'A'],
    [3, 38, 'A'],
    [3, 39, 'A'],
    [3, 40, 'A'],
    [3, 41, 'A'],
    [3, 42, 'A'],
    [3, 43, 'A'],
    [3, 44, 'A'],
    [3, 45, 'A'],
    [3, 46, 'A'],
    [3, 47, 'A'],
    [3, 48, 'A'],
    [3, 49, 'A'],
    [3, 50, 'A'],
    [3, 51, 'A'],
    [3, 52, 'A'],
    [3, 53, 'A'],
    [3, 54, 'A'],
    [3, 55, 'A'],
    [3, 56, ''],
    [3, 57, ''],
    [3, 58, ''],
    [3, 59, ''],
    [3, 60, ''],
    [4, 1, 'A'], 
    [4, 2, 'A'],
    [4, 3, 'A'],
    [4, 4, 'A'],
    [4, 5, 'A'],
    [4, 6, 'A'],
    [4, 7, 'A'],
    [4, 8, 'A'],
    [4, 9, 'A'],
    [4, 10, 'A'],
    [4, 11, 'A'],
    [4, 12, 'A'],
    [4, 13, 'A'],
    [4, 14, 'A'],
    [4, 15, 'A'],
    [4, 16, 'A'],
    [4, 17, 'A'],
    [4, 18, 'A'],
    [4, 19, 'A'],
    [4, 20, 'A'],
    [4, 21, 'A'],
    [4, 22, 'A'],
    [4, 23, 'A'],
    [4, 24, 'A'],
    [4, 25, 'A'],
    [4, 26, 'A'],
    [4, 27, 'A'],
    [4, 28, 'A'],
    [4, 29, 'A'],
    [4, 30, 'A'],
    [4, 31, 'A'],
    [4, 32, 'A'],
    [4, 33, 'A'],
    [4, 34, 'A'],
    [4, 35, 'A'],
    [4, 36, 'A'],
    [4, 37, 'A'],
    [4, 38, 'A'],
    [4, 39, 'A'],
    [4, 40, 'A'],
    [4, 41, 'A'],
    [4, 42, 'A'],
    [4, 43, 'A'],
    [4, 44, 'A'],
    [4, 45, 'A'],
    [4, 46, 'A'],
    [4, 47, 'A'],
    [4, 48, 'A'],
    [4, 49, 'A'],
    [4, 50, 'A'],
    [4, 51, 'A'],
    [4, 52, 'A'],
    [4, 53, 'A'],
    [4, 54, 'A'],
    [4, 55, 'A'],
    [4, 56, ''],
    [4, 57, ''],
    [4, 58, ''],
    [4, 59, ''],
    [4, 60, '']
  ]
  studentClasses.forEach(studentsClasses => {
    db.run(`INSERT INTO StudentClasses (idStudents, idClasses, note) VALUES (?, ?, ?)`, studentsClasses);
  })

  // remove duplicate studentclasses
  db.run(`
    DELETE FROM StudentClasses
    WHERE idStudentClasses NOT IN (
      SELECT MIN(idStudentClasses)
      FROM StudentClasses
      GROUP BY idStudents, idClasses, enrollmentDate
    );
  `);

  /* ============================ STUDENTS ===============================*/
  db.run(`
    CREATE TABLE IF NOT EXISTS Students (
      idStudents INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      names VARCHAR(100),
      surnames VARCHAR(100),
      phone VARCHAR(100),
      email VARCHAR(100),
      addressStudents TEXT,
      shiftStudents VARCHAR(100),
      idCareer INTEGER,
      FOREIGN KEY (idCareer) REFERENCES Career (idCareer)
    );
  `);

  const students = [
    ['Carlos Enrique', 'Ulloa Martinez', '+50588638578', 'carlos.ulloa211572@udem.edu.ni', 'Altagracia Neighborhood', 'Morning', 1],
 	  ['Jonathan', 'Garcia Lopez', '+50576929022', 'jonathan.garcia211370@udem.edu.ni', 'San Isidro Neighborhood', 'Morning', 1],
    ['Luis Javier', 'Lorio Rodriguez', '+50576603617', 'luis.lorio211621@udem.edu.ni', 'Ticomo Neighborhood', 'Morning', 1],
	  ['Josue Abraham', 'Castellon Vivas', '+50585796788', 'josue.castellon211372@udem.edu.ni', 'Cedro Galan Neighborhood', 'Morning', 1]
  ];
  students.forEach(student => {
    db.run(`INSERT INTO Students (names, surnames, phone, email, addressStudents, shiftStudents, idCareer) VALUES (?, ?, ?, ?, ?, ?, ?)`, student);
  });
  // remove duplicate student
  db.run(`
    DELETE FROM Students
    WHERE idStudents NOT IN (
      SELECT MIN(idStudents)
      FROM Students
      GROUP BY names, surnames, phone, email, addressStudents, shiftStudents, idCareer
    );  
  `);

  /* ============================ USERS ===============================*/
  db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      idUsers INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      code INTEGER,
      passwd TEXT,
      idStudents INTEGER,
      FOREIGN KEY (idStudents) REFERENCES Students (idStudents)
    );
  `);

  const users = [
    [211572, '12345', 1], // me
    [211370, '12345', 2], // garcia
    [211621, '12345', 3], // luis
    [211372, '12345', 4] // josue
  ];
  users.forEach(user => {
    db.run(`INSERT INTO Users(code, passwd, idStudents) VALUES (?, ?, ?)`, user);
  });

  // remove duplicate users
  db.run(`
    DELETE FROM Users
    WHERE idUsers NOT IN (
      SELECT MIN(idUsers)
      FROM Users
      GROUP BY code, passwd, idStudents
    );
  `);

  /* ======================== CLASSES DETAILS ==========================*/
  db.run(`
    CREATE TABLE IF NOT EXISTS ClassesDetails (
      idClassesDetails INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      idClasses INTEGER,
      idDetails INTEGER,
      FOREIGN KEY (idClasses) REFERENCES Classes (idClasses),
      FOREIGN KEY (idDetails) REFERENCES Details (idDetails)
    );
  `);

  const classesDetails = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
    [7, 7],
    [8, 8],
    [9, 9],
    [10, 10],
    [11, 11],
    [12, 12],
    [13, 13],
    [14, 14],
    [15, 15],
    [16, 16],
    [17, 17],
    [18, 18],
    [19, 19],
    [20, 20],
    [21, 21],
    [22, 22],
    [23, 23],
    [24, 24],
    [25, 25],
    [26, 26],
    [27, 27],
    [28, 28],
    [29, 29],
    [30, 30],
    [31, 31],
    [32, 32],
    [33, 33],
    [34, 34],
    [35, 35],
    [36, 36],
    [37, 37],
    [38, 38],
    [39, 39],
    [40, 40],
    [41, 41],
    [42, 42],
    [43, 43],
    [44, 44],
    [45, 45],
    [46, 46],
    [47, 47],
    [48, 48],
    [49, 49],
    [50, 50],
    [51, 51],
    [52, 52],
    [53, 53],
    [54, 54],
    [55, 55],
    [56, 56],
    [57, 57],
    [58, 58],
    [59, 59],
    [60, 60]
  ];
  classesDetails.forEach(classesDetail => {
    db.run(`INSERT INTO ClassesDetails (idClasses, idDetails)  VALUES (?, ?)`, classesDetail);
  });

  // remove duplicate users
  db.run(`
    DELETE FROM ClassesDetails
    WHERE idClassesDetails NOT IN (
      SELECT MIN(idClassesDetails)
        FROM ClassesDetails
        GROUP BY idClasses, idDetails
    );
  `);

  console.log('Duplicados eliminados en todas las tablas.');
  console.log("Datos insertados correctamente");
});

export default db;