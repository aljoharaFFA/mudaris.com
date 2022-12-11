const axios = require("axios");
const course = require("../model/Cmodel");
const { grade } = require("../model/model");
const Tutor = require("../model/model").userDB;
const Student = require("../model/model").student;
exports.index = (req, res) => {
  res.render("index");
};

exports.SearchResultPage = (req, res) => {
  //make a get request to /api/users
  axios
    .get("http://localhost:3000/SearchResultPage/api/users")
    .then(function (response) {
      console.log(response.data);
      res.render("SearchResultPage", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.SignInPageStudent = (req, res) => {
  res.render("SignInPageStudent");
};

exports.SignInPageTutor = (req, res) => {
  res.render("SignInPageTutor");
};

exports.studentProfile = async (req, res) => {
  const id = req.params.id;
  const data = await Student.findOne({ _id: id });
  res.render("studentProfile", {
    data,
  });
};

exports.studentSignUpPage = (req, res) => {
  res.render("studentSignUpPage");
};

exports.tutorProfile = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    res.render("tutorProfile");
  } catch (error) {
    console.log(error);
  }

  /*axios.get('http://localhost:3000/SearchResultPage/api/users',{params:{id:req.query.id}})
	.then(function(userdata){
		res.render('tutorProfile',{user: userdata.data})
	})
	.catch(err => {
		res.send(err);
	})*/
};

exports.tutorSignUpPage = (req, res) => {
  res.render("tutorSignUpPage");
};

exports.tutorViewProfile = async (req, res) => {
  const id = req.params.id;
  try {
    var response = await Tutor.findOne({ _id: id });
    const courseById = await course.findById(response.course);
    const gradeById = await grade.findById(response.grade);
    const userData = {
      _id: response.id,
      Fname: response.Fname,
      Lname: response.Lname,
      email: response.email,
      Phone: response.Phone,
      Password: response.Password,
      Price: response.Price,
      About: response.About,
      grade: gradeById.gradeName,
      course: courseById.CourseName,
    };

    res.render("tutorViewProfile", { user: userData, data: {} });

    ///
  } catch (error) {
    res.send(error);
  }
};

exports.termsandconditions = (req, res) => {
  res.render("termsandconditions");
};

exports.Browse = async function (req, res) {
  const tutor = await Tutor.find();
  for (let i = 0; i < tutor.length; i++) {
    const courseById = await course.findById(tutor[i].course);
    const gradeById = await grade.findById(tutor[i].grade);

    let newData = tutor[i];

    newData.course = courseById.CourseName;
    newData.grade = gradeById.gradeName;

    tutor[i].course = courseById.CourseName;
    tutor[i].grade = gradeById.gradeName;
    const data = {
      _id: tutor[i].id,
      Fname: tutor[i].Fname,
      Lname: tutor[i].Lname,
      email: tutor[i].email,
      Phone: tutor[i].Phone,
      Password: tutor[i].Password,
      Price: tutor[i].Price,
      About: tutor[i].About,
      grade: gradeById.gradeName,
      course: courseById.CourseName,
      __v: 0,
    };
    tutor[i] = data;
  }
  // console.log(tutor);

  res.render("Browse", {
    users: tutor,
  });
};
