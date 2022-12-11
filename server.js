const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());

connectDB();

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("assets"));

app.use("/assets/css", express.static(path.resolve(__dirname, "assets/css")));
app.use(
  "/assets/images",
  express.static(path.resolve(__dirname, "assets/images"))
);
app.use("/assets/js", express.static(path.resolve(__dirname, "assets/js")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/SearchResultPage", (req, res) => {
  res.render("SearchResultPage");
});
app.get("/SignInPageStudent", (req, res) => {
  res.render("SignInPageStudent");
});
app.get("/SignInPageTutor", (req, res) => {
  res.render("SignInPageTutor");
});
app.get("/studentProfile", (req, res) => {
  res.render("studentProfile");
});
app.get("/studentSignUpPage", (req, res) => {
  res.render("studentSignUpPage");
});
app.get("/tutorProfile", (req, res) => {
  res.render("tutorProfile");
});
app.get("/tutorSignUpPage", (req, res) => {
  res.render("tutorSignUpPage");
});
app.get("/tutorViewProfile", (req, res) => {
  res.render("tutorViewProfile");
});
app.get("/terms", (req, res) => {
  res.render("termsandconditions");
});
app.get("/error", (req, res) => {
  res.send("Error");
});

app.use("/studentProfile/api/users", require("./server/routes/student"));
app.use("/tutorProfile/api/users", require("./server/routes/tutor"));

app.use("/", require("./server/routes/router"));
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
