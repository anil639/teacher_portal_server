const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacher");

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

//register user

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newTeacher = await Teacher.create({
      userName: req.body.userName,
      password: hashedPassword,
    });
    res.json({ message: "new User created successfully" });
  } catch (error) {
    res.send(error);
  }
});

//Login user
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ userName });
    if (!teacher) {
      return res.status(400).send("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ id: teacher._id }, jwtSecret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
