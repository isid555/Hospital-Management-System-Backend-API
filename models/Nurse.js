const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    gender: { type: String },
    phone: { type: String },
    department: [{
        type: String,
    }],
    approved: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default : 'pending'
    },
    shift: [{
        type: String,
    }],
});

const Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;