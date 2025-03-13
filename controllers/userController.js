const mongoose = require("mongoose");
const User = require("../models/User");
const Prescription = require("../models/Prescription");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      return res.status(200).json({
        status: "success",
        message: "All Users",
        users: users,
      });
    } else {
      return res.status(404).send("No Users Found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.status(200).json({
      status: "success",
      message: "User Found",
      user: user,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: req.body,
      },

      { new: true }
    );
    if (!updatedUser) return res.status(404).send("User not found");
    res.send({
      message: "User updated Successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) return res.status(404).send("User not found");
    res.status(200).json({
      status: "success",
      message: "User deleted successfully"
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.user._id;

  console.log('User ID from token:', userId); // Debugging log

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found in database'); // Debugging log
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { password, ...rest } = user._doc;
    const prescriptions = await Prescription.find({ user: userId });

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: {
        ...rest,
        prescriptions,
      },
    });
  } catch (err) {
    console.error('Error retrieving user profile:', err); // Debugging log
    res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
  }
};