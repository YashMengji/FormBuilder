const express = require("express");
require("dotenv").config();
const performanceInsightsRoutes = require("./routes/performanceInsightsRoutes");
const remedialProgramsRoutes = require("./routes/remedialProgramsRoutes");
const reportCardModel = require("./models/reportCards.js"); //TEMPORARY CHANGES
const performanceInsightModel = require("./models/performanceInsights");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Welcome to the API! The server is running.");
});

app.use("/api/performance-insights", performanceInsightsRoutes);
app.use("/api/remedial-programs", remedialProgramsRoutes);
app.get("/api/reports", async (req, res) => { // Temp route
  const reportCards =  await reportCardModel.find();
  return res.status(200).json(reportCards);
});
app.get("/api/performance/delete", async (req, res) => { // Temp route
  await performanceInsightModel.deleteMany({});
  res.status(200).json({message: "All performance insights are deleted !"});
});
app.get("/api/reports/:id", async (req, res) => {
  try {
    const reportCard = await reportCardModel.findById(req.params.id);
    res.status(200).json(reportCard);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

const PORT = process.env.PORT  || 3000;

app.listen(PORT, () => {
  console.log("Server running on: ", PORT)
});