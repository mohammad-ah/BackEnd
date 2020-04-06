const mongoose = require("mongoose");
const Schama = mongoose.Schema;
const Words = require("../models/filteration")

const schema = new Schama({
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

//validation function
function checkPostContent(value) {
    return !(value.text === null && value.img === null)
}

//now pass in the dateStampSchema object as the type for a schema field
var postSchema = new Schema({
    postInfo: {type:schema, validate:checkPostContent}
});

//validation function
async function checkUnhealthyWords(value) {
    const postWordsList = this.text.split(" ");
    const wordsList = Words.find().words;
    wordsList.forEach(word => {
        postWordsList.forEach(element => {
            if (element == word) {
                this.unhealthy = false;
            }
        });
    });
}

postSchema.index({ userid: 1 }, { sparse: true });

module.exports = mongoose.model('Post', postSchema);
