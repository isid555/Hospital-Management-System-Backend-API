const Nurse = require("../models/Nurse");

exports.getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.status(200).json({
      success: true,
      message: "All Nurses",
      data: nurses,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getNurseProfile = async (req, res) => {
  try {
    const nurse = await Nurse.findById(req.user._id);
    if (!nurse) return res.status(404).send("Nurse not found");

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: nurse,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


exports.updateNurse = async (req, res) => {
  try {
    const nurse = await Nurse.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true }
    );
    if (!nurse) return res.status(404).send("Nurse not found");
    res.status(200).json({
      status: "success",
      message: "Nurse profile updated successfully",
      data: nurse,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteNurse = async (req, res) => {
  try {
    const deletedNurse = await Nurse.findByIdAndDelete(req.user._id);
    if (!deletedNurse) return res.status(404).send("Nurse not found");

    res.status(200).json({
      status: "success",
      message: "Nurse deleted Succesfully",
      data: deletedNurse,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getNurseProfile = async (req, res) => {
  const nurseId = req.user._id;

  try {
    const nurse = await Nurse.findById(nurseId);

    if (!nurse) {
      return res
        .status(404)
        .json({ success: false, message: "nurse not found" });
    }

    const { password, ...rest } = nurse._doc;

    res.status(200).json({
      success: true,
      messsage: "Profile info is getting",
      data: {
        ...rest,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
