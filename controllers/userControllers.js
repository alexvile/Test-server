const { User } = require('../models/userModel')

const registerController = async (req, res) => {
    const { email, password } = req.body;
    const user = new User({password, email});
    await user.save();
    return res.status(201).json({email});
}
module.exports = {
    registerController
}