const mongoose = require("mongoose");

const performanceInsightsSchema = new mongoose.Schema({
  
})

const performanceInsights = mongoose.model("performance_insights", performanceInsightsSchema)

module.exports = performanceInsights;