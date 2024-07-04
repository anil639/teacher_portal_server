const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Anil");
});

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("DB connection established"))
  .catch((error) => console.log(error));

app.listen(8000, () => {
  console.log("app listening on 8000");
});
