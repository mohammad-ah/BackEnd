const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
    unhealthypostsnum: {
        type: Number,
        default: 0
    },
    createdat: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema);
