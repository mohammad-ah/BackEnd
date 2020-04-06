const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    followers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    following: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    active: {
        type: Boolean,
        default: true
    },
    recievenotifications: {
        type: Boolean,
        default: true
    },
    createdat: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
