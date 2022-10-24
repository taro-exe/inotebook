const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    id: {
        type: String
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        deafult: 'general',
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("note", notesSchema);
