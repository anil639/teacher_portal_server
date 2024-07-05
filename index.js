require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 8000;
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Anil");
// });

mongoose
  .connect("mongodb://localhost:27017/Teacher_portal")
  .then(() => console.log("DB connection established"))
  .catch((error) => console.log(error));

//Routes
app.use("/api", authRoutes);
app.use("/api/students", studentRoutes);

app.listen(port, () => {
  console.log(`DB connection established on ${port}`);
});
