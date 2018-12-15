var mongoose = require('mongoose');

var lecturerSchema = mongoose.Schema({
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
    unique: true
  },
  DateOfBirth: {
    type: Date ,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

var lecturer = mongoose.model('Lecturer', lecturerSchema);
module.exports = lecturer;
