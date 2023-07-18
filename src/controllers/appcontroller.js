// const express = require("express");
// var router = express.Router();
// const mongoose = require("mongoose");
// // Importing required modules

// const Schema = mongoose.Schema;
// const appSchema = new Schema({
//   fullname: String,
//   mobileno: String,
//   email: String,
//   adate: Date,
//   atime: String,
// });
// const Appoint = mongoose.model("Appoint", appSchema);

// // Creating routes for CRUD operations
// // Create a new user
// router.post("/appointment", async (req, res) => {
//   try {
//     const userApp = new Appoint(req.body);
//     await user.save();

//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Read all users
// router.get("/appointment", async (req, res) => {
//   try {
//     const user = await Appoint.find({});
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Read a single user by ID
// router.get("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Update a user by ID
// router.put("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Delete a user by ID
// router.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
