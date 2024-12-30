const reportCards = require("../models/reportCards");
const performanceInsights = require("../models/performanceInsights")
const model = require("../config/geminiConfig");
const { ObjectId } = require('mongodb');

async function createPerformanceInsight(req, res) {
  try{
    const allReportCards = await reportCards.find();
    let allPefromanceInsights = await performanceInsights.find();
    allReportCards.forEach(async (report) => {
      const isPerformanceInsightExist = allPefromanceInsights.some(
          (performanceInsight) => performanceInsight.studentId.equals(report.student_id) && performanceInsight.academicYear === report.academic_year && performanceInsight.classId.equals(report.class_id) && performanceInsight.examName === report.exam_name
      );
      if(!isPerformanceInsightExist){
        const prompt = `
          Given the following student report card data:
          - Subject Grades: ${JSON.stringify(report.subject_grades)}
          - Total Marks Obtained: ${report.total_marks_obtained}
          - Total Maximum Marks: ${report.total_maximum_marks}
          - Overall Grade: ${report.overall_grade}
          - Teacher Remarks: ${report.teacher_remarks}

          Here is the order of importance A+ > A > A- > B+ > B > B- > C+ > C > C-

          Generate performance insights including:
          - Strengths: Only subject names where the student scores comparitively higher than other subjects
          - Weaknesses: Only subject names where the student scores comparitively lower than other subjects
          - Recommendations: (Suggest only name of the remedial	or	enrichment	programs any one:- Assume some remedial program and enrichment programs and suggest them)

          Return the response in the format:
          { 
            "strengths": array of string, 
            "weaknesses": array of string, 
            "recommendations": "string" 
          }.
        `;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        text = text.replace(/```/g, "").replace(/json/g, "");
        const performanceObject = JSON.parse(text);
        const performanceInsight = await performanceInsights.create({
          studentId: report.student_id,
          studentName: report.student_name,
          academicYear: report.academic_year,
          classId: report.class_id,
          examName: report.exam_name,
          strengths: performanceObject.strengths,
          weaknesses: performanceObject.weaknesses,
          recommendations: performanceObject.recommendations,
          reviewedBy: new ObjectId("6761a7e52f8b738e92c3ed4d"), // Assume a teacher ID for now (reviewed by) 
          createdBy: "Admin"
        });
      }
    });
    
    allPefromanceInsights = await performanceInsights.find();
    res.status(200).json(allPefromanceInsights);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
}

async function createClassLevelPerformanceInsight(req, res) {
  try {
    const allPerformanceInsights = await performanceInsights.find();
    const strengths = [];
    const weaknesses = [];
    allPerformanceInsights.forEach(async (performanceInsight) => {
      strengths.push(performanceInsight.strengths);
      weaknesses.push(performanceInsight.weaknesses);
    });
    prompt = `1. Provide average strength of this class in two lines: ${strengths.join(" and ")} 
              2. Provide average weakness of this class in two lines: ${weaknesses.join(" and ")}
              Provide the response in the format:
              {
                "averageStrength": "string",
                "averageWeakness": "string"
              } 
             `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text.replace(/```/g, "").replace(/json/g, "");
    text = JSON.parse(text);
    res.status(200).json(text);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
}

async function getSingleInsight(req, res) {
  try {
    // const objectId = mongoose.Types.ObjectId();
    // console.log(typeof(objectId));
    const performanceInsight = await performanceInsights.findById(req.params.id);
    console.log(performanceInsight);
    res.status(200).json(performanceInsight);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
}

module.exports = {createPerformanceInsight, createClassLevelPerformanceInsight, getSingleInsight}