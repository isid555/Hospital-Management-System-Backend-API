const User = require('../models/User');
const Doctor = require('../models/Doctor');

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' });
    res.send(doctors);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);
    if (!doctor || doctor.role !== 'doctor') return res.status(404).send("Doctor not found");
    res.send(doctor);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Create a new doctor
exports.createDoctor = async (req, res) => {
  try {
    const newDoctor = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'doctor'
    });
    const savedDoctor = await newDoctor.save();
    res.status(201).send(savedDoctor);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update a doctor by ID
exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        specialty: req.body.specialty,
        qualifications: req.body.qualifications,
        yearsOfExperience: req.body.yearsOfExperience,
      },
      { new: true }
    );

    if (!updatedDoctor) return res.status(404).send("Doctor not found");

    // Update the User schema fields
    const updatedUser = await User.findByIdAndUpdate(
      updatedDoctor.user,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send("User not found");

    res.send({
      message: "Doctor profile updated successfully",
      doctor: updatedDoctor,
      user: updatedUser
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a doctor by ID
exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await User.findByIdAndDelete(req.params.id);
    if (!deletedDoctor || deletedDoctor.role !== 'doctor') return res.status(404).send("Doctor not found");
    res.send(deletedDoctor);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a Doctor Profile with Id
exports.getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).populate('user');
    if (!doctor || doctor.role !== 'doctor') return res.status(404).send("Doctor not found");
    res.send(doctor);
  } catch (err) {
    res.status(400).send(err);
  }
};