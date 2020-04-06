const mongoose = require("mongoose");
const Schama = mongoose.Schema;

const likeSchema = new Schama({
    postid: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
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

likeSchema.index({ postid: 1, userid:1 }, { sparse: true });

module.exports = mongoose.model('Like', likeSchema);
