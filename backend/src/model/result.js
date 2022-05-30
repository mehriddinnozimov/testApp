const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    numerator: {
        type: Number,
        required: true
    },
    denominator: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model("Result", resultSchema)