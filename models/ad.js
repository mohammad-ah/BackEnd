const mongoose = require("mongoose");
const Schama = mongoose.Schema;

const adSchema = new Schama({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isAll: {
        type: Boolean,
        default: true
    },
    targeted: {
        type: Object,
        default: {}
    }
});

module.exports = mongoose.model('Ad', adSchema);
