const mongoose =  require("mongoose")

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    testId: {
        required: true,
        type: mongoose.Types.ObjectId
    },
    variants: [{
        value: {
            type: String,
            required: true
        },
        isAnswer: {
            type: Boolean,
            required: true,
            dafault: false
        }
    }]
})

module.exports = new mongoose.model("Question", questionSchema)