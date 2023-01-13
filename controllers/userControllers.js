const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const { RegistrationConflictError, NotAuthorizedError } = require('../helpers/customErrors');

const registerController = async (req, res) => {
    const { email, password } = req.body;

    if(await User.findOne({email})) {
        throw new RegistrationConflictError('This email is already in use');
    }

    const user = new User({password, email});
    await user.save();
    return res.status(201).json({email});
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw new NotAuthorizedError('User with this email not found');
    }
    if(!await bcrypt.compare(password, user.password)) {
        throw new NotAuthorizedError('Wrong password');
    }
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(user._id, {token});
    return res.status(200).json({ email, token });
}

module.exports = {
    registerController, loginController
}