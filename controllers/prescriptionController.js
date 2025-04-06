const Prescription = require("../models/Prescription");

exports.createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(200).json({
      status: "success",
      message: "Prescription created successfully",
      data: prescription,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    if (prescriptions.length < 1)
      return res.status(404).send("No Prescriptions Found");
    res.status(200).json({
      status: "success",
      message: "All Prescriptions",
      data: prescriptions,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    if (!prescription) return res.status(404).send("Prescription not found");
    res.status(200).json({
      status: "success",
      message: "Prescription Found",
      data: prescription,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updatePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Prescription updated successfully",
      data: prescription,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deletePrescription = async (req, res) => {
  try {
    const Prescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!Prescription) return res.status(404).send("Prescription not found");
    res.status(200).json({
      status: "success",
      message: "Prescription deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message
    })
  }
}


exports.getPrescriptionsByUserAndDoctor = async (req, res) => {
  const { userId, doctorId } = req.query;

  if (!userId || !doctorId) {
    return res.status(400).json({
      status: "error",
      message: "Both userId and doctorId are required",
    });
  }

  try {
    const prescriptions = await Prescription.find({
      user: userId,
      doctor: doctorId,
    });

    if (prescriptions.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No prescriptions found for this user and doctor",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Prescriptions fetched successfully",
      data: prescriptions,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
