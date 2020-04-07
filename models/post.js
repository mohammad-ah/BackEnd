const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Words = require("../models/filteration");
const User = require("../models/user");

const postSchema = new Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String
    },
    img: {
        type: String
    },
    unhealthy: {
        type: Boolean
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

postSchema.pre('save', async function(next) {
    console.log(this);
    if(this.text === null && this.img === null) {
        var err = new Error('Post should contain text or img');
        next(err);
    }

    this.unhealthy = false;
    const postWordsList = this.text.split(" ");
    const wordsList = await Words.find();
    wordsList.forEach(wordObj => {
        postWordsList.forEach(element => {
            if (element == wordObj.word) {
                this.unhealthy = true;
                updateUnhealthyPostsNum(this.userid);
                return;
            }
        });
    });
});

async function updateUnhealthyPostsNum(userid) {
    const user = await User.find({_id: userid});
    user.unhealthypostsnum += 1;
    user.save();
}

postSchema.index({ userid: 1 }, { sparse: true });

module.exports = mongoose.model('Post', postSchema);
