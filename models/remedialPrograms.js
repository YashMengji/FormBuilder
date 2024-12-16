const mongoose = require("mongoose");

const remedialProgramsSchema = new mongoose.Schema({
  
})

const remedialPrograms = mongoose.model("remedial_programs", remedialProgramsSchema)

module.exports = remedialPrograms;