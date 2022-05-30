const mongoose =  require("mongoose")

const questionSchema = new mongoose.Schema({
    title: {
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

questionSchema.methods.toJSON = function(){
    let question = this.toObject();
    question.variants.forEach(variant => {
        delete variant.isAnswer
    })
    return question;
}

module.exports = new mongoose.model("Question", questionSchema)