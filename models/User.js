const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['admin', 'doctor', 'nurse', 'patient'],
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    phone: {
        type: Number,
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
    bloodType: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;