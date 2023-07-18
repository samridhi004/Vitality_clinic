const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/usermessage");
const Reg = require("./models/userregister");
const App = require("./models/userapp");
const hbs = require("hbs");
const { registerPartials } = require("hbs");
const bodyparser = require("body-parser");
const patientController = require("./controllers/patientController");

const app = express();
const port = process.env.PORT || 5000;
//setting the path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

//middleware
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist"))
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);
app.use("/patient", patientController);
//routing
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/contact", async (req, res) => {
  try {
    // res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const regData = new Reg(req.body);
      await regData.save();
      res.status(201).redirect("login");
    } else {
      res.send("Password does not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/doctor", (req, res) => {
  res.render("doctor");
});
app.get("/templates/views/patients.hbs", (req, res) => {
  res.render("patients");
});
app.get("/appointment", (req, res) => {
  res.render("appointment");
});
app.post("/appointment", async (req, res) => {
  try {
    // const email = req.body.email;

    // const useremail = await Reg.findOne({ email: email });
    // if (useremail.email === email) {
    const appData = new App(req.body);
    await appData.save();
    res.status(201).render("index");
    //   alert("Booked successfully");
    // } else {
    //   res.status(400).send("Not Booked");
    console.log("suces");
    //}
  } catch (error) {
    res.status(400).send("Invalid login details");
  }
});
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const roles = req.body.roles;

    const useremail = await Reg.findOne({ email: email });
    if (useremail.password === password) {
      //res.status(201).render("index");
      switch (useremail.roles) {
        case "patient":
          res.status(201).render("patients");
          break;
        case "doctor":
          res.status(201).render("doctor");
          break;
        case "admin":
          res.status(201).render("admin");
          break;
        default:
          res.status(201).render("register");
      }
    } else {
      res.status(400).send("Invalid Login Details");
    }
  } catch (error) {
    res.status(400).send("Invalid login details");
  }
});
//server create
app.listen(port, () => {
  console.log("server is running at port no", port);
});
