var mongoose = require('mongoose');

var teacherSchema = mongoose.Schema({
  username: {
    type: String ,
    trim: true,
    unique: true
  },
  firstName: {
    type: String ,
    trim: true
  },
  lastName: {
    type: String ,
    trim: true
  },
  email: {
    type: String ,
    trim: true,
    lowercase: true,
    unique: true
  },
  gender: {
    type: String ,
    trim: true
  },
  firstLang: {
    type: String ,
    trim: true
  },
  secondLang: {
    type: String ,
    trim: true
  },
  DateOfBirth: {
    type: Date ,
    trim: true
  },
  ExperienceYears: {
    type: Number
  },
  ExperienceField: {
    type: String ,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

if (!teacherSchema.options.toObject) {
  teacherSchema.options.toObject = {};
}
teacherSchema.options.toObject.transform = (document, transformedDocument) => {
  delete transformedDocument.password;
  return transformedDocument;
};
var teacher = mongoose.model('Teacher', teacherSchema);
module.exports = teacher;
