const mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  Grades = mongoose.model('Grades');

// get grade by ID
module.exports.getGrades = async (req, res) => {
  if (!Validations.isObjectId(req.params.gradesId)) {
    return res.status(422).json({
      err: null,
      msg: 'grades id must be valid',
      data: null
    });
  }
  const grades = await Grades.findById(req.params.gradesId).exec();
  if (!grades) {
    return res
      .status(404)
      .json({ err: null, msg: 'Grades not found.', data: null });
  }
  res.status(200).json({
    err: null,
    msg: 'Grades retrieved successfully.',
    data: grades
  });
};

// view all grades
module.exports.getGrades = async (req, res) => {
  const grades = await Grades.find({}).exec();
  res.status(200).json({
    err: null,
    msg: 'Grades retrieved successfully.',
    data: grades
  });
};
//insert grades
module.exports.createGrades = async (req, res) => {
  const valid =
    req.body.studentId &&
    Validations.isNumber(req.body.studentId)&&
    req.body.name &&
    Validations.isString(req.body.name)&&
    req.body.Course &&
    Validations.isString(req.body.Course)&&
    req.body.Grade &&
    Validations.isNumber(req.body.Grade);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Please enter all the required fields above',
      data: null
    });
  }

  req.body.createdBy = req.decodedToken.lecturer._id;

  const grades = await Grades.create(req.body);
  res.status(201).json({
    err: null,
    msg: 'Grades was created successfully.',
    data: grades
  });
};
//search for grades by name
module.exports.searchGrades = async (req, res) => {
  //checks validity of the entered string
  if (!Validations.isString(req.params.name)) {
    return res.status(422).json({
      err: null,
      msg: 'name parameter must be a valid.',
      data: null
    });
  }
        const grades = await Grades.find({
          name: new RegExp(req.params.name, 'i')
        }).exec();
        res.status(200).json({
          err: null,
          msg:
           'the retrival was successful but its empty',
          data: grades
        });
      };
// update grades
module.exports.updateGrades = async (req, res) => {
  if (!Validations.isObjectId(req.params.gradesId)) {
    return res.status(422).json({
      err: null,
      msg: 'GradesId parameter must be a valid GradesId.',
      data: null
    });
  }
  const valid =
    req.body.Grade &&
    Validations.isString(req.body.Grade)
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Grade is a  required field.',
      data: null
    });
  }
  delete req.body.createdAt;
  req.body.updatedAt = moment().toDate();

  const updatedGrades = await Grades.findByIdAndUpdate(
    req.params.gradesId,
    {
      $set: req.body
    },
    { new: true }
  ).exec();
  if (!updatedGrades) {
    return res
      .status(404)
      .json({ err: null, msg: 'the Grades were not found', data: null });
  }

  res.status(200).json({
    err: null,
    msg: ' Grade was updated successfuly.',
    data: updatedGrades
  });
};

module.exports.searchGradesToken = async (req, res) => {
  //checks validity of the entered string
  if (!Validations.isString(req.params.name)) {
    return res.status(422).json({
      err: null,
      msg: 'name parameter must be a valid.',
      data: null
    });
  }
  if(!(res.decodedToken.user.firstName = req.params.name)){
    return res.status(400).json({
      err: null,
      msg: 'you are only authorized to view your grades',
      data: null
    });
  }
        const grades = await Grades.find({
          name: new RegExp(req.params.name, 'i')
        }).exec();
        res.status(200).json({
          err: null,
          msg:
           'the retrival was successful but its empty',
          data: grades
        });
      };
