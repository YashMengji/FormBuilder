const mongoose = require('mongoose');

const reportCardSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile', // Reference to student_profile collection
    required: true,
  },
  academic_year: {
    type: String,
    required: true,
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassSection', // Reference to class_section collection
    required: true,
  },
  exam_name: {
    type: String,
    required: true,
  },
  subject_grades: {
    type: Object, // JSON object to store grades
    required: true,
  },
  total_marks_obtained: {
    type: mongoose.Schema.Types.Decimal128, // Stores decimal values
    required: true,
  },
  total_maximum_marks: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  overall_grade: {
    type: String,
  },
  teacher_remarks: {
    type: String,
  },
  generated_date: {
    type: Date,
    default: Date.now, // Defaults to current timestamp
  },
  created_by: {
    type: String,
  },
  updated_by: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now, // Defaults to current timestamp
  },
  updated_date: {
    type: Date,
    default: Date.now, // Defaults to current timestamp
  },
});

// Middleware to update timestamps
reportCardSchema.pre('save', function (next) {
  const now = new Date();
  if (!this.createdDate) {
    this.createdDate = now;
  }
  this.updatedDate = now;
  next();
});

reportCardSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedDate: new Date() });
  next();
});

reportCardSchema.pre('updateOne', function (next) {
  this.set({ updatedDate: new Date() });
  next();
});

module.exports = mongoose.model('report_cards', reportCardSchema);
