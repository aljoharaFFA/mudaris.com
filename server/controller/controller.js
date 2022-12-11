const course = require("../model/Cmodel");
var userDB = require("../model/model");
var Student = require("../model/model");
/*courses documents were created here like this
const Course2 = new coursess({
		CourseName: "PHYSICS",
		CourseDesc: "Physics subject"
	});
	
	Course2.save().then((result) => {
		res.send(result);
	}).catch((err) => {
		console.log(err)
	});
	*/

module.exports;

exports.createSTUDENT = async function (req, res) {
  //validate req
  if (!req.body) {
    res.status(400).send({ message: "Content can't be empty" });
    return;
  }

  const student = new Student({
    sFname: req.body.sFname,
    sLname: req.body.sLname,
    semail: req.body.semail,
    sPhone: req.body.sPhone,
    sPassword: req.body.sPassword,
  });

  //save user in the database

  student
    .save(student)
    .then((data) => {
      res.redirect("/studentProfile"); //??? check what this does
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error while creating a user",
      });
    });
};
exports.createCourse = async function (req, res) {
  const { CourseName, CourseDesc } = req.body;
  // await course.create({ CourseDesc, CourseName });
  res.status(200).json({
    message: "course created",
  });
};
exports.updateTeacher = async function (req, res) {
  //validate req
  if (!req.body) {
    res.status(400).send({ message: "Content can't be empty" });
    return;
  }
  console.log(req.body);

  const gradeById = await userDB.grade.find({ gradeName: req.body.G });
  const id = req.body.id;
  const courseById = await course.find({ CourseName: req.body.C1.trim() });
  const user = await userDB.userDB.findByIdAndUpdate(id, {
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    email: req.body.email,
    Phone: req.body.Phone,
    Password: req.body.Password,
    About: req.body.About,
    About: req.body.Price,
    grade: gradeById[0].id,
    course: courseById[0].id,
  });

  res.redirect(`/tutorProfile/${id}`); //??? check what this does

  // if (user)
  // {
  // } else {
  //   res.status(500).send({
  //     message: err.message || "error while creating a user",
  //   });
  // }
};

exports.createCourse = async function (req, res) {
  const { CourseName, CourseDesc } = req.body;
  // await course.create({ CourseDesc, CourseName });
  res.status(200).json({
    message: "course created",
  });
};
exports.createNewTeacher = async function (req, res) {
  //validate req
  if (!req.body) {
    res.status(400).send({ message: "Content can't be empty" });
    return;
  }

  const gradeById = await userDB.grade.find({ gradeName: req.body.G });

  console.log("grade is", req.body.G.trim());
  const courseById = await course.find({ CourseName: req.body.C1.trim() });

  const user = await userDB.userDB.create({
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    email: req.body.email,
    Phone: req.body.Phone,
    Password: req.body.Password,
    Price: req.body.Price,
    About: req.body.About,

    grade: gradeById[0].id,
    course: courseById[0].id,
  });

  if (user) {
    res.redirect(`/tutorProfile/${user.id}`); //??? check what this does
  } else {
    res.status(500).send({
      message: err.message || "error while creating a user",
    });
  }
};

//create and save a new user
exports.create = async function (req, res) {
  //validate req
  if (!req.body) {
    res.status(400).send({ message: "Content can't be empty" });
    return;
  }

  // const courseData = await course.find({ CourseName: C1 });
  // if (!courseData) {
  //   res.status(500).send({
  //     message: err.message || "error while creating a user",
  //   });
  // }

  // return;
  //new user
  const user = new userDB({
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    email: req.body.email,
    Phone: req.body.Phone,
    Password: req.body.Password,
    Price: req.body.Price,
    About: req.body.About,
    grade: req.body.G,
    course: req.body.C1,
  });

  //save user in the database
  user
    .save(user)
    .then((data) => {
      res.redirect("/tutorProfile"); //??? check what this does
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error while creating a user",
      });
    });
};

//update a new user by user ids
exports.updateSTUDENT = function (req, res) {
  if (!req.body) {
    res.status(400).send({ message: "data to update is empty" });
    return;
  }

  const id = req.params.id;
  Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "cannot update user with id: " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

// retrieve and return single/all STUDENT/s
exports.findSTUDENT = function (req, res) {
  if (req.query.id) {
    const id = req.query.id;

    Student.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id " + id });
      });
  } else {
    Student.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error while try to retrive user data",
        });
      });
  }
};

exports.deleteSTUDENT = function (req, res) {
  const id = req.params.id;

  Student.findByIdAndDelete(id)

    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "cannot delete user with id: " + id });
      } else {
        res.send({
          message: "user was deleted",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error cannot delete user information" });
    });
};

// retrieve and return single/all user/s
exports.find = function (req, res) {
  if (req.query.id) {
    const id = req.query.id;

    userDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id " + id });
      });
  } else {
    userDB
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error while try to retrive user data",
        });
      });
  }
};

//update a new user by user ids
exports.update = function (req, res) {
  if (!req.body) {
    res.status(400).send({ message: "data to update is empty" });
    return;
  }

  const id = req.params.id;
  userDB
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "cannot update user with id: " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

//delete a user with specifed user ids
exports.delete = function (req, res) {
  const id = req.params.id;

  userDB
    .findByIdAndDelete(id)

    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "cannot delete user with id: " + id });
      } else {
        res.send({
          message: "user was deleted",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error cannot delete user information" });
    });
};
