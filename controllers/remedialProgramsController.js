const remedialPrograms = require("../models/remedialPrograms");


async function getRemedialProgramStudentList(req, res) {
  try{
    const allRegisteredStudents = await remedialPrograms.find();
    res.status(200).json(allRegisteredStudents);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}

async function registerStudent(req, res) {
  try{
    if(!req.body.studentId || !req.body.subjectId || !req.body.programType || !req.body.startDate || !req.body.endDate || !req.body.progressStatus || !req.body.createdBy || !req.body.updatedBy){
      return res.status(400).json({message: "All fields are required"});
    }
    const newProgram = new remedialPrograms({
      studentId: mongoose.Types.ObjectId(req.body.studentId),
      studentName: req.body.studentName,
      subjectId: mongoose.Types.ObjectId(req.body.subjectId),
      programType: req.body.programType,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      instructorId: mongoose.Types.ObjectId(req.body.instructorId),
      progressStatus: req.body.progressStatus,
      feedback: req.body.feedback,
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
    });

    const savedProgram = await newProgram.save();
    res.status(201).json(savedProgram);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}

async function updateStudent(req, res) {
  try {
    if (!req.body.updatedBy) {
      return res.status(400).json({ message: "The 'updatedBy' field is required" });
    }

    const updatedFields = {};

    if (req.body.studentId) {
      updatedFields.studentId = mongoose.Types.ObjectId(req.body.studentId);
    }
    if (req.body.subjectId) {
      updatedFields.subjectId = mongoose.Types.ObjectId(req.body.subjectId);
    }
    if (req.body.programType) {
      updatedFields.programType = req.body.programType;
    }
    if (req.body.description) {
      updatedFields.description = req.body.description;
    }
    if (req.body.startDate) {
      updatedFields.startDate = req.body.startDate;
    }
    if (req.body.endDate) {
      updatedFields.endDate = req.body.endDate;
    }
    if (req.body.instructorId) {
      updatedFields.instructorId = mongoose.Types.ObjectId(req.body.instructorId);
    }
    if (req.body.progressStatus) {
      updatedFields.progressStatus = req.body.progressStatus;
    }
    if (req.body.feedback) {
      updatedFields.feedback = req.body.feedback;
    }

    updatedFields.updatedBy = req.body.updatedBy;
    updatedFields.updatedDate = new Date();

    const savedProgram = await remedialPrograms.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true } 
    );

    res.status(200).json(savedProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



module.exports = {getRemedialProgramStudentList, registerStudent, updateStudent}