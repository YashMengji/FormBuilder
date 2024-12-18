const mongoose = require("mongoose");

const performanceInsightsSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassSection',
    required: true,
  },
  examName: {
    type: String,
    required: true,
  },
  strengths: {
    type: String,
  },
  weaknesses: {
    type: String,
  },
  recommendations: {
    type: String,
  },
  generatedDate: {
    type: Date,
    default: Date.now,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeacherProfile',
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
  },
})

// Middleware to update timestamps
performanceInsightsSchema.pre('save', function (next) {
  const now = new Date();
  if (!this.createdDate) {
    this.createdDate = now;
  }
  this.updatedDate = now;
  next();
});

performanceInsightsSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedDate: new Date() });
  next();
});

performanceInsightsSchema.pre('updateOne', function (next) {
  this.set({ updatedDate: new Date() });
  next();
});

const performanceInsights = mongoose.model("performance_insights", performanceInsightsSchema)

module.exports = performanceInsights;