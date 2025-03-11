const Patient = require("../models/Patient");

// Get all users
exports.getAllPatients = async (req, res) => {
  try {
    const users = await Patient.find().populate("user");
    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ message: "No Patients Found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single user by ID
exports.getPatientById = async (req, res) => {
  try {
    const user = await Patient.findById(req.params.id).populate("user");
    if (!user) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a user by ID
exports.updatePatient = async (req, res) => {
  try {
    const updatedUser = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({
      message: "Patient updated Successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a user by ID
exports.deletePatient = async (req, res) => {
  try {
    const deletedUser = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};