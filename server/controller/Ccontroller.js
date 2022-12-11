var course = require("../model/Cmodel");

exports.create = async function (req, res) {
  //validate req
  if (!req.body) {
    res.status(400).send({ message: "Content can't be empty" });
    return;
  }

  const course_ = new course({
    CourseName: req.body.CourseName,
    CourseDesc: req.body.CourseDesc,
  });

  course_
    .save(course_)
    .then((data) => {
      res.redirect("/tutorProfile"); //??? check what this does
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error while creating a user",
      });
    });
};

// retrieve and return single/all user/s
exports.find = function (req, res) {
  if (req.query.id) {
    const id = req.query.id;
    course
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
    course
      .find()
      .then((course_) => {
        res.send(course_);
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
  course
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

  course
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
