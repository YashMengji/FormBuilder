const reportCards = require("../models/reportCards");
const performanceInsights = require("../models/performanceInsights")
const model = require("../config/geminiConfig");

async function createPerformanceInsight(req, res) {
  try{
    const allReportCards = await reportCards.find();
    allReportCards.forEach(async (report) => {
      const prompt = `
        Given the following student report card data:
        - Subject Grades: ${JSON.stringify(report.subject_grades)}
        - Total Marks Obtained: ${report.total_marks_obtained}
        - Total Maximum Marks: ${report.total_maximum_marks}
        - Overall Grade: ${report.overall_grade}
        - Teacher Remarks: ${report.teacher_remarks}

        Generate performance insights including:
        - Strengths: (Subjects	or	topics	where	the	student	excels)
        - Weaknesses: (Subjects	or	topics	where	the	student	struggles)
        - Recommendations:s (Suggested	remedial	or	enrichment	programs:- Assume some remedial program and enrichment programs and suggest them)

        Return the response in the format:
        { 
          "strengths": "string", 
          "weaknesses": "string", 
          "recommendations": "string" 
        }.
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      text = text.replace(/```/g, "").replace(/json/g, "");
      const performanceObject = JSON.parse(text);

    });
    res.status(200).json("Successful");
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
}

module.exports = {createPerformanceInsight}