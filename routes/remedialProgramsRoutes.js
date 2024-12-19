const express = require("express");
const { getRemedialProgramStudentList, registerStudent, updateStudent } = require("../controllers/remedialProgramsController");


const router = express.Router();

router.get("/", getRemedialProgramStudentList);
router.post("/register", registerStudent)
router.update("/:id/update", updateStudent)


module.exports = router;
