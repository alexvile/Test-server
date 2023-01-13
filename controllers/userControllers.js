const { User } = require('../models/userModel');
const { RegistrationConflictError, NotAuthorizedError } = require('../helpers/customErrors')

const registerController = async (req, res) => {
    const { email, password } = req.body;

    if(await User.findOne({email})) {
        throw new RegistrationConflictError('This email is already in use')
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
    if(password !== user.password) {
        throw new NotAuthorizedError('Wrong password')
    }
    return res.status(200).json({ email });
}

module.exports = {
    registerController, loginController
}