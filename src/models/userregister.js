const mongoose = require("mongoose");
const validator = require("validator");

const regSchema = new mongoose.Schema({
  name: {
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
  password: {
    type: String,
    required: true,
    min: 5,
  },
  confirmpassword: {
    type: String,
    required: true,
    minLength: 3,
  },
  roles: {
    type: String,
    required: true,
  },
});
const Reg = mongoose.model("Reg", regSchema);

module.exports = Reg;
