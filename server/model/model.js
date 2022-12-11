const mongoose = require("mongoose");

var signUP = new mongoose.Schema({
  Fname: {
    type: String,
  },
  Lname: {
    type: String,
  },
  email: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Password: {
    type: String,
  },
  Price: {
    type: String,
  },
  About: {
    type: String,
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "grade",
    required: [true, "please Enter Grade"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "please Enter Course"],
  },
});

var students = new mongoose.Schema({
  sFname: {
    type: String,
  },
  sLname: {
    type: String,
  },
  semail: {
    type: String,
  },
  sPhone: {
    type: String,
  },
  sPassword: {
    type: String,
  },
});

var Grade = new mongoose.Schema({
  gradeName: {
    type: String,
    required: [true, "please enter grade"],
  },
});

const userDB = mongoose.model("userdb", signUP);
const student = mongoose.model("student", students);
const grade = mongoose.model("grade", Grade);

module.exports = { student, userDB, grade };
