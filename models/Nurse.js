const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    department: {
        type: String,
    },
    shift: {
        type: String,
    }
});

const Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;