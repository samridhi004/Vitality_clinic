const express = require("express");
var router = express.Router();
const Pat = require("../models/userpatient");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.get("/", (req, res) => {
  res.render("patient/manage_patient.hbs", {
    viewTitle: "Insert Patient",
  });
});
router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});
router.get("/admin", (req, res) => {
  res.render("admin");
});
function insertRecord(req, res) {
  try {
    // res.send(req.body);
    const patientData = new Pat(req.body);
    patientData.save();
    res.status(201).render("admin");
  } catch (error) {
    if (error.name == "ValidationError") {
      handleValidationError(error, req.body);
      res.render("patient/manage_patient.hbs", {
        viewTitle: "Insert Patient",
        patientData: req.body,
      });
    } else {
      res.status(500).send(error);
    }
  }
}

router.get("/list", (req, res) => {
  Pat.find()
    .then(function (docs) {
      res.render("patient/list", {
        viewTitle: "Insert Patient",
        list: docs,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  //Return results
});
function updateRecord(req, res) {
  Pat.findByIdAndUpdate().then(
    { _id: req.body._id },
    req.body,
    { new: true },
    (error, doc) => {
      if (!error) {
        req.session.msg = "message here";
        res.redirect("patient/list");
      } else {
        if (error.name == "ValidationError") {
          handleValidationError(error, req.body);
          res.render("patient/manage_patient", {
            viewTitle: "Update Patient",
            Pat: req.body,
          });
        } else {
          console.log("error in updating" + error);
        }
      }
    }
  );
}
function handleValidationError(error, body) {
  for (field in error.errors) {
    switch (error.errors[field].path) {
      case "firstname":
        body["firstnameerror"] = error.errors[field].message;

        break;

      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Pat.findById()
    .then(req.params.id, function (docs) {
      res.render("patient/list", {
        list: docs,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  //Return results
});
router.get("/delete/:id", (req, res) => {
  Pat.findByIdAndRemove()
    .then(req.params._id, function (docs) {
      res.render("patient/list", {
        list: docs,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  // if (!error) {
  //   res.redirect("/patient/list");
  // } else {
  //   console.log("Error in employee delete: " + error);
  // }
});
module.exports = router;
