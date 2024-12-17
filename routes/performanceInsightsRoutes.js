const express = require("express");
const {createPerformanceInsight} = require("../controllers/performanceInsightsController")

const router = express.Router();

// Admin will click on button to create performance-insights of all students in the database using gemini API
router.get("/create", createPerformanceInsight)

module.exports = router;