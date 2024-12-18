const mongoose = require("mongoose");

const remedialProgramsSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicSubjects',
    required: true,
  },
  programType: {
    type: String,
    enum: ['Remedial', 'Enrichment'],
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeacherProfile',
  },
  progressStatus: {
    type: String,
    enum: ['In Progress', 'Completed', 'Not Started'],
    required: true,
  },
  feedback: {
    type: String,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
  },
  updatedBy: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  }
})

// Middleware to update timestamps
remedialProgramsSchema.pre('save', function (next) {
  const now = new Date();
  if (!this.createdDate) {
    this.createdDate = now;
  }
  this.updatedDate = now;
  next();
});

remedialProgramsSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedDate: new Date() });
  next();
});

remedialProgramsSchema.pre('updateOne', function (next) {
  this.set({ updatedDate: new Date() });
  next();
});

const remedialPrograms = mongoose.model("remedial_programs", remedialProgramsSchema)

module.exports = remedialPrograms;