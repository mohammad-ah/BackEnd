const mongoose = require("mongoose");
const Schama = mongoose.Schema;

const notificationSchema = new Schama({
    to: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    read_by: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    createdat: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
