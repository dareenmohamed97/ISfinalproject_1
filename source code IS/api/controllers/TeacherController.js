var mongoose = require('mongoose'),
  moment = require('moment'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config').EMAIL_REGEX,
  Teacher = mongoose.model('Teacher');

module.exports.registerTeacher = async (req, res, next ) => {

  var valid =
  req.body.username&&
  Validations.isString(req.body.username)&&
  req.body.firstName&&
  Validations.isString(req.body.firstName)&&
  req.body.lastName&&
  Validations.isString(req.body.lastName)&&
  req.body.email &&
  Validations.isString(req.body.email) &&
  Validations.matchesRegex(req.body.email, EMAIL_REGEX) &&
  req.body.gender &&
  Validations.isString(req.body.gender)&&
  req.body.firstLang&&
  Validations.isString(req.body.firstLang)&&
  req.body.secondLang&&
  Validations.isString(req.body.secondLang)&&
  req.body.DateOfBirth  &&
  Validations.isDate(moment(req.body.DateOfBirth))&&
  req.body.ExperienceYears &&
  Validations.isNumber(req.body.ExperienceYears)&&
  req.body.ExperienceField &&
  Validations.isString(req.body.ExperienceField)&&
  req.body.password&&
  Validations.isString(req.body.password);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'All the fields are required.',
      data: null
    });
  }

  var password = req.body.password.trim();
  if (password.length < 8) {
    return res.status(422).json({
      err: null,
      msg: 'Password must be of length 8 characters or more.',
      data: null
    });
  }

  Teacher.findOne({
    email: req.body.email.trim()
  }).exec(function(err, teacher) {

    if (err) {
      return next(err);
    }

    if (teacher) {
      return res.status(409).json({
        err: null,
        msg:
          'A user with this email address already exists, please try another email address.',
        data: null
      });
    }

    delete req.body.createdAt;
    delete req.body.updatedAt;

    Encryption.hashPassword(password, function(err, hash) {

      if (err) {
        return next(err);
      }
      req.body.password = hash;
      Teacher.create(req.body, function(err, teacher) {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          err: null,
          msg: 'Registration successful, you can now login to your account.',
          data: teacher.toObject()
        });
      });
    });
  });
};

module.exports.loginTeacher = async (req, res, next) => {

  var valid =
      req.body.username&&
      Validations.isString(req.body.username)&&
      req.body.password &&
      Validations.isString(req.body.password);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg:
          'Username and password(String) are required fields.',
      data: null
    });
  }

  Teacher.findOne({
    username: req.body.username.trim()
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    Encryption.comparePasswordToHash(req.body.password, user.password, function(
      err,
      passwordMatches
    ) {
      if (err) {
        return next(err);
      }

      if (!passwordMatches) {
        return res
          .status(401)
          .json({ err: null, msg: 'Password is incorrect.', data: null });
      }
      // Create a JWT and put in it the user object from the database
      var token = jwt.sign(
        {
        // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
          teacher: user.toObject()
        },
        req.app.get('secret'),
        {
          expiresIn: '12h'
        }
      );
        // Send the JWT to the frontend
      res.status(200).json({
        err: null,
        msg: 'You are now logged in',
        data: {
          'token': token,
          'name': user.firstName,
          'type': 'teacher'
        }
      });
    });
  });
};

// search for a teacher by id
module.exports.getTeacher = async (req, res) => {
  // check required id filed is there
  if (!Validations.isObjectId(req.params.teacherId)) {
    return res.status(422).json({
      err: null,
      msg: 'Teacher id must be valid',
      data: null
    });
  }
  const teacher = await Teacher.findById(req.params.teacherId).exec();
  if (!teacher) {
    return res
      .status(404)
      .json({ err: null, msg: 'Teacher not found.', data: null });
  }
  res.status(200).json({
    err: null,
    msg: 'Teacher retrieved successfully.',
    data: teacher
  });
};

module.exports.viewTeachers = async (req, res) => {
  const teachers = await Teacher.find({}).exec();
  res.status(200).json({
    err: null,
    msg: 'Teachers retrieved successfully.',
    data: teachers
  });
};

module.exports.getTeachers = async (req, res) => {
  const teachers = await Teacher.find({}).exec();
  res.status(200).json({
    err: null,
    msg: 'Teachers retrieved successfully.',
    data: teachers
  });
};
