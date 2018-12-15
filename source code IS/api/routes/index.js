var express = require('express'),
  mongoose = require('mongoose'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  studentCtrl = require('../controllers/StudentController'),
  teacherCtrl = require('../controllers/TeacherController'),
  lecturerCtrl = require('../controllers/LecturerController'),
  gradesCtrl = require('../controllers/GradesController');

var isAuthenticated = function(req, res, next) {
  // Check that the request has the JWT in the authorization header
  var token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: 'You have to login first before performing this action',
      data: null
    });
  }
  // Verify that the JWT is created using our server secret and that it hasn't expired yet
  jwt.verify(token, req.app.get('secret'), function(err, decodedToken) {
    if (err) {
      return res.status(401).json({
        error: err,
        msg: 'Login timed out, please login again.',
        data: null
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};


var isNotAuthenticated = function(req, res, next) {
  // Check that the request doesn't have the JWT in the authorization header
  var token = req.headers['authorization'];
  jwt.verify(token, req.app.get('secret'), function(err) {
    if (err) {
      next();
    }
    else {
      return res.status(401).json({
        error: err,
        msg: 'You are already logged in.',
        data: null
      });
    }
  });
};


var isLecturer = function(req, res, next) {
  // If user not found then he/she is not a Lecturer
  if(!req.decodedToken.lecturer) {
    return res.status(403).json({
      err: null,
      msg: 'You are not allowed to access lecturer funcions',
      data: null
    });
  } else {
    next();
  }
};

var isStudent = function(req, res, next) {
  // If user not found then he/she is not a lecturer
  if(!req.decodedToken.student) {
    return res.status(403).json({
      err: null,
      msg: 'You are not allowed to access student funcions',
      data: null
    });
  } else {
    next();
  }
};


var isTeacher = function(req, res, next) {
  // If user not found then he/she is not a Lecturer
  if(!req.decodedToken.teacher) {
    return res.status(403).json({
      err: null,
      msg: 'You are not allowed to access teacher funcions',
      data: null
    });
  } else {
    next();
  }
};

//Authentication
router.post('/student/registerStudent', isNotAuthenticated, studentCtrl.registerStudent);
router.post('/teacher/registerTeacher', isNotAuthenticated, teacherCtrl.registerTeacher);
router.post('/teacher/loginTeacher', isNotAuthenticated, teacherCtrl.loginTeacher);
router.post('/student/loginStudent', isNotAuthenticated, studentCtrl.loginStudent);
router.post('/lecturer/registerLecturer', isNotAuthenticated, lecturerCtrl.registerLecturer);
router.post('/lecturer/loginLecturer', isNotAuthenticated, lecturerCtrl.loginLecturer);

//Grades
router.get('/grades/getGrades', (gradesCtrl.getGrades));
router.get('/grades/getGrades/:gradesId', (gradesCtrl.getGrades));
router.post('/grades/createGrades', isAuthenticated, isLecturer ,gradesCtrl.createGrades);
router.patch('/grades/updateGrades/:gradesId', isAuthenticated, isLecturer ,gradesCtrl.updateGrades);
router.get('/grades/searchGrades/:name', (gradesCtrl.searchGrades));
router.get('/grades/searchGradesToken/:name', (gradesCtrl.searchGradesToken));
//teacher
router.get('/teacher/getTeacher/:teacherId', (teacherCtrl.getTeacher));
router.get('/teacher/getTeachers' ,teacherCtrl.getTeachers);
router.get('/teacher/viewTeachers', teacherCtrl.viewTeachers);

module.exports = router;
