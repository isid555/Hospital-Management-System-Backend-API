const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');
const Nurse = require('../models/Nurse');
const mongoose = require('mongoose');

exports.ApproveDoctor = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: 'error', message: 'Invalid doctor ID' });
    }

    try {
        const doctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: { approved: 'approved' } },
            { new: true }
        );

        if (!doctor) {
            return res.status(404).json({ status: 'error', message: 'Doctor not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Doctor Approved',
            doctor: doctor
        });
    } catch (err) {
        console.error('Error approving doctor:', err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};


exports.RejectDoctor = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: 'error', message: 'Invalid doctor ID' });
    }

    try {
        const doctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: { approved: 'rejected' } },
            { new: true }
        );

        if (!doctor) {
            return res.status(404).json({ status: 'error', message: 'Doctor not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Doctor Rejected',
            doctor: doctor
        });
    } catch (err) {
        console.error('Error approving doctor:', err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};


exports.ApproveNurse = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: 'error', message: 'Invalid nurse ID' });
    }

    try {
        const nurse = await Nurse.findByIdAndUpdate(
            id,
            { $set: { approved: 'approved' } }, // Set approved to 'approved'
            { new: true }
        );

        if (!nurse) {
            return res.status(404).json({ status: 'error', message: 'Nurse not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Nurse Approved',
            nurse: nurse
        });
    } catch (err) {
        console.error('Error approving nurse:', err); 
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

exports.RejectNurse = async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: 'error', message: 'Invalid nurse ID' });
    }

    try {
        const nurse = await Nurse.findByIdAndUpdate(
            id,
            { $set: { approved: 'rejected' } }, 
            { new: true }
        );

        if (!nurse) {
            return res.status(404).json({ status: 'error', message: 'Nurse not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Nurse Rejected',
            nurse: nurse
        });
    } catch (err) {
        console.error('Error approving nurse:', err); // Log the error
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

exports.getPendingDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({ approved: 'pending' });
        res.status(200).json({ success: true, data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch pending doctors' });
    }
};

exports.getPendingNurses = async (req, res) => {
    try {
        const nurses = await Nurse.find({ approved: 'pending' });
        res.status(200).json({ success: true, data: nurses });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch pending nurses' });
    }
};

exports.getApprovedDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({ approved: 'approved' });
        res.status(200).json({ success: true, data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch pending doctors' });
    }
};

exports.getApprovedNurses = async (req, res) => {
    try {
        const nurses = await Nurse.find({ approved: 'approved' });
        res.status(200).json({ success: true, data: nurses });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch pending nurses' });
    }
};


exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.user._id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedAdmin) return res.status(404).send("Admin not found");
        res.status(200).json({
            status: "success",
            message: "Admin profile updated successfully",
            admin: updatedAdmin
        })

    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
}


exports.deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.user._id);
        if (!deletedAdmin) return res.status(404).send("Admin not found");
        res.status(200).json({
            status: "success",
            message: "Admin profile deleted successfully",
            admin: deletedAdmin
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message,
        });
    }
};

exports.getAdminProfile = async (req, res) => {
    const adminId = req.user._id; // Get the authenticated admin's ID

    console.log('Admin ID from token:', adminId); // Debugging log

    try {
        const admin = await Admin.findById(adminId);

        if (!admin) {
            console.log('Admin not found in database'); // Debugging log
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        const { password, ...rest } = admin._doc;

        res.status(200).json({
            success: true,
            message: "Profile info is getting",
            data: {
                ...rest,
            },
        });
    } catch (err) {
        console.error('Error retrieving admin profile:', err); // Debugging log
        res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
    }
};


exports.deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

        if (!deletedDoctor || deletedDoctor.role !== "doctor") {
            return res.status(404).json({ status: "error", message: "Doctor not found" });
        }

        res.status(200).json({
            success: true,
            message: "Doctor profile deleted successfully",
            data: deletedDoctor
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


exports.deleteNurse = async (req, res) => {
    try {
        const nurseId = req.params.id;
        const deletedNurse = await Nurse.findByIdAndDelete(nurseId);

        if (!deletedNurse || deletedNurse.role !== "nurse") {
            return res.status(404).json({ status: "error", message: "Nurse not found" });
        }

        res.status(200).json({
            success: true,
            message: "Nurse deleted successfully",
            data: deletedNurse
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
};



