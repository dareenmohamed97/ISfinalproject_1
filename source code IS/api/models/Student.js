var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
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
  ID: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

if (!studentSchema.options.toObject) {
  studentSchema.options.toObject = {};
}
studentSchema.options.toObject.transform =  (document, transformedDocument) => {
  delete transformedDocument.password;
  return transformedDocument;
};
var student = mongoose.model('Student', studentSchema);
module.exports = student;
