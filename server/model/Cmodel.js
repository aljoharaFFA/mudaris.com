const mongoose = require("mongoose");

var Coursess = new mongoose.Schema({
  CourseName: {
    type: String,
    required: [true, "Please Provide the Course Name"],
  },
  CourseDesc: {
    type: String,
    required: [true, "Please Provide the Course Description"],
  },
});

const course = mongoose.model("Course", Coursess);

module.exports = course;
