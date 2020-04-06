const mongoose = require("mongoose");
const Schama = mongoose.Schema;

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
function chechPostValidity(value) {
    return !(value.text === null && value.img === null)
}

//now pass in the dateStampSchema object as the type for a schema field
var postSchema = new Schema({
    postInfo: {type:schema, validate:chechPostValidity}
});

postSchema.index({ userid: 1 }, { sparse: true });

module.exports = mongoose.model('Post', postSchema);
