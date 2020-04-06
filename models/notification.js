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
    createdat: {
        type: Date,
        default: Date.now
    },
    updatedat: {
        type: Date,
        default: Date.now
    }
});

// commentSchema.index({ postid: 1, userid:1 }, { sparse: true });

module.exports = mongoose.model('Notification', notificationSchema);
