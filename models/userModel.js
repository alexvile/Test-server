const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true , "Password is required"],
    },
    email: {
        type: String,
        required: [true , "Password is required"],
        unique: true
    },
    token: {
        type: String,
        default: null
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    }
},
{ versionKey: false, timestamps: true }
)

userSchema.pre('save', async function EncryptPasswordBeforeSaving() {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});


const User = mongoose.model('User', userSchema);

module.exports = {
    User
}