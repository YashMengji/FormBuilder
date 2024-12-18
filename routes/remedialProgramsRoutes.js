const express = require("express");
const { getRemedialProgramStudentList } = require("../controllers/remedialProgramsController");

const router = express.Router();

router.get("/", getRemedialProgramStudentList);


module.exports = router;
