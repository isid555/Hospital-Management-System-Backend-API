const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation/validation');
const data = require('../data/admin')


exports.register = async (req, res) => {
    // Validate the data before creating a user
    const { error } = registerValidation(req.body);
    if (error) { 
        const errorDetails = error.details.map(detail => detail.message);
        return res.status(400).send(errorDetails);
    }

    const role = req.body.role
    if (role == 'admin') return res.status(400).send('Admin cannot register here')

    // Check if the user already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    // Hash the password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });

    try {
        const savedUser = await user.save();
        res.send({
            message: "Successfully registered",
            user: savedUser
        });
    } catch (err) {
        res.status(400).send(err);
    }
};


// Login Function
exports.login = async (req, res) => {
    // Validate the data before logging in
    const { error } = loginValidation(req.body);
    if (error) {
        const errorDetails = error.details.map(detail => detail.message);
        return res.status(400).send(errorDetails);
    }

    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is wrong');

    // Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY);
    res.header('auth-token', token).send({
        message: "Successfully logged in",
        token: token
    });
};