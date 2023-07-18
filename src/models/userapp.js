const mongoose = require("mongoose");
const validator = require("validator");

const appSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Imvalid Email Id");
      }
    },
    unique: true,
  },
  mobileno: {
    type: String,
    required: true,
    min: 10,
  },
  adate: {
    type: Date,
    required: true,
  },
  atime: {
    type: String,
    required: true,
  },
});
const App = mongoose.model("App", appSchema);

module.exports = App;
