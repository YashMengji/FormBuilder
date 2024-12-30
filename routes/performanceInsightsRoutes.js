const express = require("express");
const {createPerformanceInsight, createClassLevelPerformanceInsight, getSingleInsight} = require("../controllers/performanceInsightsController")


const router = express.Router();

// Admin will click on button to create performance-insights of all students in the database using gemini API
router.get("/create", createPerformanceInsight)
router.get("/class-level", createClassLevelPerformanceInsight)
router.get("/:id", getSingleInsight)

module.exports = router;