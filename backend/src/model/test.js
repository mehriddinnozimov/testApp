const mongoose =  require("mongoose")

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    variants: [{
        value: {
            type: String,
            required: true
        },
        isAnswer: {
            type: Boolean,
            required: true
        }
    }]
})

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
    data: [questionSchema]
}, {
    timestamps: true
})


module.exports = new mongoose.model("Test", testSchema)