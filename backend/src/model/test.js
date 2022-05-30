const mongoose =  require("mongoose")

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
        enum:[1, 2, 3]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    data: [{
        type: mongoose.Schema.ObjectId,
        ref: "Question"
    }],
    results: [{
        type: mongoose.Schema.ObjectId,
        ref: "Result"
    }]
}, {
    timestamps: true
})

module.exports = new mongoose.model("Test", testSchema)