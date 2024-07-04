const express = require("express");
const router = express.Router();

const Student = require("../models/student");
const auth = require("../middleware/auth");

//get all students data
router.get("/", auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.send(error);
  }
});

//add students data
router.post("/add", auth, async (req, res) => {
  const { name, subjects, marks } = req.body;
  try {
    let student = await Student.findOne({ name, subjects });
    if (student) {
      student.marks += marks;
    } else {
      student = new Student({ name, subjects, marks });
    }
    await student.save();
    res.json(student);
  } catch (error) {
    res.send(error);
  }
});

//edit student data
router.put("/edit/:id", auth, async (req, res) => {
  const { name, subjects, marks } = req.body;
  try {
    let student = await Student.findById(req.params.id);
    if (student) {
      student.name = name;
      student.subjects = subjects;
      student.marks = marks;
      await student.save();
      res.json(student);
    } else {
      res.send("Student not found");
    }
  } catch (error) {
    res.send(error);
  }
});

// Delete students data
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: "Student deleted" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
