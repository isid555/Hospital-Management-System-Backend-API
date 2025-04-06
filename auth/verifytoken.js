const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Nurse = require('../models/Nurse');
const Admin = require('../models/Admin');

function verifyToken(req, res, next) {
    const token = req.headers['auth-token'];

    if (!token) return res.status(401).send('No token provided. Access Denied');
    
    try {
        console.log('Token to Verify:', token); // Log the token
        const decoded = jwt.verify(token, "sid_hospitals");
        console.log('Verified Token:', decoded); // Log the decoded token
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token Verification Error:', err); // Log the error
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token is Expired' });
        }

        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

const verifyRole = roles => async (req, res, next) => {
    const userId = req.user._id;

    let user;

    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);
    const nurse = await Nurse.findById(userId);
    const admin = await Admin.findById(userId);

    if (patient) {
        user = patient;
    } else if (doctor) {
        user = doctor;
    } else if (nurse) {
        user = nurse;
    } else if (admin) {
        user = admin;
    }
    console.log('User:', user); // Log the user
    console.log('User Role:', user.role); // Log the user role
    console.log('Required Role:', roles); // Log the roles

    if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ success: false, message: "Access Denied" });
    }

    next();
};

module.exports = { verifyToken, verifyRole };