const mongoose = require("mongoose");
const Schama = mongoose.Schema;

const filterationSchema = new Schama({
    word: {
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

module.exports = mongoose.model('Filteration', filterationSchema);
