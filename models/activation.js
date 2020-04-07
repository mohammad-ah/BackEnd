const mongoose = require("mongoose");
const Schama = mongoose.Schema;

const activationSchema = new Schama({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewed: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('Activation', activationSchema);
