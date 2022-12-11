const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
const controller2 = require("../controller/Ccontroller");
const router = require("./student");
router.use(express.json());
const { grade } = require("../model/model");
const course = require("../model/Cmodel");
const Tutor = require("../model/model").userDB;

route.get("/", services.index);
route.get("/SearchResultPage", services.SearchResultPage);
route.get("/SignInPageStudent", services.SignInPageStudent);
route.get("/SignInPageTutor", services.SignInPageTutor);
route.get("/studentProfile/:id", services.studentProfile);
route.get("/studentProfile2", (req, res) => {
  res.send("Login to see Profile");
});
route.post("/tutorPr3ofile/api/users/changeProfile", controller.updateTeacher);
route.get("/studentSignUpPage", services.studentSignUpPage);
route.get("/tutorProfile/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Tutor.findOne({ _id: id });
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

    res.render("tutorProfile", {
      data: userData,
    });
  } catch (error) {
    res.send({ message: "Sever Error" });
  }
});
route.post("/getSearch", async (req, res) => {
  console.log(req.body);

  const tutor = await Tutor.find();
  const { search } = req.body;

  let latestData = [];
  for (let i = 0; i < tutor.length; i++) {
    const courseById = await course.findById(tutor[i].course);
    const gradeById = await grade.findById(tutor[i].grade);
    console.log(gradeById);
    tutor[i].course = courseById?.CourseName;
    tutor[i].grade = gradeById?.gradeName;

    const data = {
      _id: tutor[i].id,
      Fname: tutor[i].Fname,
      Lname: tutor[i].Lname,
      email: tutor[i].email,
      Phone: tutor[i].Phone,
      Password: tutor[i].Password,
      Price: tutor[i].Price,
      About: tutor[i].About,
      grade: gradeById?.gradeName,
      course: courseById?.CourseName,
      __v: 0,
    };
    if (courseById?.CourseName?.includes(search)) {
      latestData.push(data);
    }
    tutor[i] = data;
  }

  res.render("Browse", {
    users: latestData,
  });
});

route.get("/tutorSignUpPage", services.tutorSignUpPage);
route.get("/tutorViewProfile/:id", services.tutorViewProfile);
route.get("/termsandconditions", services.termsandconditions);
route.get("/Browse", services.Browse);

//API
route.post("/createGrade", async (req, res) => {
  const { gradeName } = req.body;
  await grade.create({ gradeName });
  res.status(200).json({
    message: "grade created",
  });
});
route.post("/SignInPageTutor/api/users", controller.create);
route.get("/SignInPageTutor/api/users", controller.find);
route.put("/SignInPageTutor/api/users", controller.update);
route.delete("/SignInPageTutor/api/users", controller.delete);

route.post("/tutorProfile/api/users", async (req, res) => {
  console.log(req.body);

  return res.status(0);
});

route.post("/tutorProfile/api/users/create", controller.createNewTeacher);

route.get("/tutorProfile/api/users", controller.find);
route.put("/tutorProfile/api/users", controller.update);
route.delete("/tutorProfile/api/users", controller.delete);

route.post("/tutorSignUpPage/api/users", controller.create);
route.get("/tutorSignUpPage/api/users", controller.find);
route.put("/tutorSignUpPage/api/users/:id", controller.update);
route.delete("/tutorSignUpPage/api/users/:id", controller.delete);

route.post("/SearchResultPage/api/users", controller.create);
route.get("/SearchResultPage/api/users", controller.find);
route.put("/SearchResultPage/api/users", controller.update);
route.delete("/SearchResultPage/api/users", controller.delete);

route.post("/tutorViewProfile/api/users", controller.create);
route.get("/tutorViewProfile/api/users", controller.find);
route.put("/tutorViewProfile/api/users", controller.update);
route.delete("/tutorViewProfile/api/users", controller.delete);

//2

route.post("/tutorProfile/api/users", controller2.create);
route.get("/tutorProfile/api/users", controller2.find);
route.put("/tutorProfile/api/users", controller2.update);
route.delete("/tutorProfile/api/users", controller2.delete);

route.post("/tutorSignUpPage/api/course", controller2.create);
route.get("/tutorSignUpPage/api/course", controller.find);
route.put("/tutorSignUpPage/api/course/:id", controller2.update);
route.delete("/tutorSignUpPage/api/course/:id", controller2.delete);

route.post("/SearchResultPage/api/users", controller2.create);
route.get("/SearchResultPage/api/users", controller2.find);
route.put("/SearchResultPage/api/users", controller2.update);
route.delete("/SearchResultPage/api/users", controller2.delete);

route.post("/tutorViewProfile/api/users", controller2.create);
route.get("/tutorViewProfile/api/users", controller2.find);
route.put("/tutorViewProfile/api/users", controller2.update);
route.delete("/tutorViewProfile/api/users", controller2.delete);

/*
route.get('/', (req, res) => {
	res.render('index')
})
route.get('/SearchResultPage', (req, res) => {
	res.render('SearchResultPage')
})
route.get('/SignInPageStudent', (req, res) => {
	res.render('SignInPageStudent')
})
route.get('/SignInPageTutor', (req, res) => {
	res.render('SignInPageTutor')
})
route.get('/studentProfile', (req, res) => {
	res.render('studentProfile')
})
route.get('/studentSignUpPage', (req, res) => {
	res.render('studentSignUpPage')
})
route.get('/tutorProfile', (req, res) => {
	res.render('tutorProfile')
})
route.get('/tutorSignUpPage', (req, res) => {
	res.render('tutorSignUpPage')
})
route.get('/tutorViewProfile', (req, res) => {
	res.render('tutorViewProfile')
})
*/

module.exports = route;
