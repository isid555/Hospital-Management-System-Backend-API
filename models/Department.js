const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;