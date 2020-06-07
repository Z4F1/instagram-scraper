const mongoose = require('mongoose');

const { Schema } = mongoose;

const userScheme = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "member"
    },
    accounts: [String]
}, {
	timestamps: true,
});

const User = mongoose.model('User', userScheme);

module.exports = User;