const mongoose = require('mongoose');
var gradesSchema = mongoose.Schema({
  studentId: {
    type: Number,
    required: true,
    min: 0
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  Course: {
    type: String,
    required: true,
    trim: true
  },
  Grade: {
    type: Number,
    required: true,
    min: 0
  }
});
mongoose.model('Grades', gradesSchema);
