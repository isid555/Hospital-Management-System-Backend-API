const User = require("../models/User");
const Doctor = require("../models/Doctor");

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.send(doctors);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a single doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor || doctor.role !== "doctor")
      return res.status(404).send("Doctor not found");
    res.send(doctor);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update a doctor by ID
exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedDoctor) return res.status(404).send("Doctor not found");

    res.status(200).json({
      status: "success",
      message: "Doctor profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

// Delete a doctor by ID
exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor || deletedDoctor.role !== "doctor")
      return res.status(404).send("Doctor not found");
    res.send(deletedDoctor);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a Doctor Profile with Id
exports.getDoctorProfile = async (req, res) => {
  const doctorId = req.user._id;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const { password, ...rest } = doctor._doc;
    // const appointments = await Booking.find({ doctor: doctorId });

    res.status(200).json({
      success: true,
      messsage: "Profile info is getting",
      data: {
        ...rest,
        // appointments
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
