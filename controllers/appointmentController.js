const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

exports.createAppointment = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json({
            status: "success",
            message: "Appointment created successfully",
            data: newAppointment
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        if (appointments.length < 1) return res.status(404).send("No Appointments Found");
        res.status(200).json({
            status: "success",
            message: "All Appointments",
            data: appointments
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}


exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).send("Appointment not found");
        res.status(200).json({
            status: "success",
            message: "Appointment Found",
            data: appointment
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        });
    }
}

exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).send("Appointment not found");

        // Check if the authenticated user is the doctor of the appointment
        if (req.user.role !== 'doctor' || appointment.doctor.toString() !== req.user._id) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            message: "Appointment updated successfully",
            data: updatedAppointment
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err.message
        });
    }
}

exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).send("Appointment not found");

        // Check if the authenticated user is the doctor of the appointment
        if (req.user.role !== 'doctor' || appointment.doctor.toString() !== req.user._id) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) return res.status(404).send("Appointment not found");
        res.status(200).json({
            status: "success",
            message: "Appointment deleted successfully",
            data: deletedAppointment
        });
    } catch (err) {
        console.error('Error deleting appointment:', err);
        res.status(400).json({
            status: "error",
            message: err.message
        });
    }
}


exports.getUserAppointments = async (req, res) => {
    try {
        const userId = req.user._id; // Get the authenticated user's ID
        const userRole = req.user.role; // Get the authenticated user's role

        let appointments;
        if (userRole === 'patient') {
            appointments = await Appointment.find({ user: userId }).populate('doctor');
        } else if (userRole === 'doctor') {
            appointments = await Appointment.find({ doctor: userId }).populate('user');
        } else {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        if (appointments.length < 1) {
            return res.status(404).json({ success: false, message: "No appointments found" });
        }

        res.status(200).json({
            success: true,
            message: "User's appointments retrieved successfully",
            data: appointments
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


exports.cancelAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).send("Appointment not found");

        // Check if the authenticated user is either the doctor or the user of the appointment
        if (
            (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user._id) ||
            (req.user.role === 'patient' && appointment.user.toString() !== req.user._id)
        ) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { $set: { status: 'cancelled' } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully",
            data: updatedAppointment
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};


exports.completeAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).send("Appointment not found");

        // Check if the authenticated user is the doctor of the appointment
        if (req.user.role !== 'doctor' || appointment.doctor.toString() !== req.user._id) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { $set: { status: 'completed' } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Appointment marked as completed successfully",
            data: updatedAppointment
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};