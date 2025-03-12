const express = require("express");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Nurse = require("../models/Nurse");
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
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    } else if (role === "nurse") {
      user = await Nurse.findOne({ email });
    }

    // Check if user exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        role,
        gender,
        phone,
      });
    }

    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        role,
        gender,
        phone,
      });
    }
    if (role === "nurse") {
      user = new Nurse({
        name,
        email,
        password: hashPassword,
        role,
        gender,
        phone,
      });
    }

    await user.save();
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

    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    if (nurse) {
      user = nurse;
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
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '20d' });

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
