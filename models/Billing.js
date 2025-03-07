const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid', 'pending'],
        default: 'unpaid'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;