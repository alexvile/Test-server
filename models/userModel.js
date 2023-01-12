const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true , "Password is required"],
    },
    email: {
        type: String,
        required: [true , "Password is required"],
        unique: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}