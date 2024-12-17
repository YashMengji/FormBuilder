const express = require("express");
require("dotenv").config();
const performanceInsightsRoutes = require("./routes/performanceInsightsRoutes");
const remedialProgramsRoutes = require("./routes/remedialProgramsRoutes");
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

const PORT = process.env.PORT  || 3000;

app.listen(PORT, () => {
  console.log("Server running on: ", PORT)
});