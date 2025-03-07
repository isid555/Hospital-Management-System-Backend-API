const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medicalHistory: [{
        type: String
    }],
    currentMedications: [{
        type: String
    }],
    allergies: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;