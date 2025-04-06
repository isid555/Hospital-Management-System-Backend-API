const express = require("express");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Nurse = require("../models/Nurse");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");

exports.register = async (req, res) => {
  // Validate the data before creating a user
  const { error } = registerValidation(req.body);
  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return res.status(400).send(errorDetails);
  }

  const { name, email, password, role, gender, phone } = req.body;
  try {
    let Model;
    if (role === "patient") Model = User;
    else if (role === "doctor") Model = Doctor;
    else if (role === "nurse") Model = Nurse;
    else if (role === "admin") Model = Admin;
    else return res.status(400).json({ message: "Invalid role" });

    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new Model({ name, email, password: hashPassword, role, gender, phone });
    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "User successfully created" });
  } catch (err) {
    console.error("Error during registration:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error, Try again" });
  }
};

exports.login = async (req, res) => {
  // Validate the data before login
  const { error } = loginValidation(req.body);
  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return res.status(400).send(errorDetails);
  }

  const { email, password } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    const nurse = await Nurse.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    if (nurse) {
      user = nurse;
    }
    if (admin) {
      user = admin;
    }
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    // Get token
    const token = jwt.sign({ _id: user._id, role: user.role }, "sid_hospitals", { expiresIn: '7d' });

    console.log('Generated Token:', token); // Add this line to print the token

    const { password: userPassword, role, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully Login",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
