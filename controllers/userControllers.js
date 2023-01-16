const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/userModel');
const { RegistrationConflictError, NotAuthorizedError, NotFoundError, BadRequestError } = require('../helpers/customErrors');
const { sendEmail } = require('../services/sendEmail');
const { verificationTemplate, resendVerificationTemplate } = require('../email_templates/emailTemplates')

const registerController = async (req, res) => {
    const { email, password } = req.body;

    if(await User.findOne({email})) {
        throw new RegistrationConflictError('This email is already in use');
    }

    const verificationToken = uuidv4();

    const user = new User({ password, email, verificationToken });
    await user.save();
    
    const mail = {
        to: email,
        subject: "Verify your email address",
        html: verificationTemplate(verificationToken)
    }
    await sendEmail(mail);
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
    if(!user.verify) {
        throw new NotAuthorizedError('Email not verify');
    }
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(user._id, {token});
    return res.status(200).json({ email, token });
}

const getCurrentController = async (req, res) => {
    const { email } = req.user
    return res.status(200).json({email})
}

const logoutController = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: null});
    return res.status(204).json();
}

const verifyEmailController = async (req, res) => { 
    const { verificationToken } = req.params;
    
    const user = await User.findOne({verificationToken});
    if (!user) {
        throw new NotFoundError('User not found');
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });
    return res.status(200).json({
        message: "Verification successfull"
    })
}

const resendVerifyEmailController = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw new NotFoundError('User not found');
    };
    if(user.verify) {
        throw new BadRequestError('Verification has already been passed');
    };
    const mail = {
        to: email,
        subject: "Verify your email address",
        html: resendVerificationTemplate(user.verificationToken)
    }
    await sendEmail(mail);
    return res.status(200).json({
        message: "Verification email resent"
    })
}

module.exports = {
    registerController, loginController, logoutController, getCurrentController, verifyEmailController, resendVerifyEmailController
}