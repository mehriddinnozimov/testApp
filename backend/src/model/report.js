const mongoose =  require("mongoose")

const reportSchema = new mongoose.Schema({
	title: {
		type: String,
		required:true
	},
	author: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	testId: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	testAuthor: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	content: {
		type: String
	},
	completed: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

module.exports = new mongoose.model("Report", reportSchema)