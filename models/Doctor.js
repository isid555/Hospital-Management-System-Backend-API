const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
        required: true
    },
    gender: {
        type: String,
    },
    phone: {
        type: Number
    },
    specialty: [{
        type: String,
        default: 'general'
    }],
    qualifications: [{
        type: String,
    }],
    yearsOfExperience: [{
        type: Number,
    }],
    Department: [{
        type: String
    }],
    bio: {
        type: String
    },
    about: {    
        type: String
    },
    approved: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        default : 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;