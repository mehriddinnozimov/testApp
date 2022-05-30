const Result = require("../model/result")
const Test = require("../model/test")
const User = require("../model/user")

exports.getMe = async (req, res) => {
	let query = { authorId: req.user._id }
	if(req.query) query = Object.assign(req.query, query)
	const results = await Result.find(query).sort({createdAt:-1})
	return res.json({ success: true, results })
}

exports.getByTestId = async (req, res) => {
	let query = { testId: req.params.testId, authorId: req.user._id }
	if(req.query) query = Object.assign(req.query, query)
	const results = await Result.find(query).sort({createdAt:-1})
	return res.json({ success: true, results })
}

exports.getByTestIdForTestCreator = async (req, res) => {
	try {
		let query = { testId: req.params.testId }
		if(req.query) query = Object.assign(req.query, query)
		let test = await Test.findOne({ _id: query.testId, author: req.user._id })
		if(!test) throw "Access to results is not allowed"
		const results = await Result.find(query).sort({createdAt:-1})
		return res.json({ success: true, results })
	} catch (err) {
		return res.json({ success: false, err })
	}
}

exports.create = async (req, res) => {
	try {
		if(!req.body || !req.body.data) throw "Wrong Body"
		const test = await Test.findOne({ _id: req.params.testId }).populate("data")
		let numerator = 0
		for(let i = 0; i < req.body.data.length; i++){
			let userAnswer = req.body.data[i]
			if(test.data[i].variants[userAnswer].isAnswer) numerator = numerator + 1
		}
		const result  = new Result({
			testId: test._id,
			authorId: req.user._id,
			numerator: numerator,
			denominator: test.data.length
		})
		test.results.push(result._id)
		req.user.results.push(result._id)
		await result.save()
		await req.user.save()
		await test.save()
		return res.json({ success: true, result })
	} catch (err) {
		console.log(err)
		return res.json({ success: false, err })
	}
}