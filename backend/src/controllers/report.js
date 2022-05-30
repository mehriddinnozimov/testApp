const Report = require("../model/report")
const Test = require("../model/test")
const User = require("../model/user")

exports.getForMe = async (req, res) => {
	let query = { testAuthor: req.user._id }
	if(req.query) query = Object.assign(req.query, query)
	const reports = await Report.find(query).sort({createdAt:-1})
	return res.json({ success: true, reports })
}

exports.getFromMe = async (req, res) => {
	let query = { author: req.user._id }
	if(req.query) query = Object.assign(req.query, query)
	const reports = await Report.find(query).sort({createdAt:-1})
	return res.json({ success: true, reports })
}

exports.getByTestId = async (req, res) => {
	try {
        const report = await Report.findOne({ testId: req.params.testId })
        if(!report) throw "Report not found"
        return res.json({ success: true, report })
    } catch (err) {
        return res.json({ success: false, err })
    }
}

exports.getById = async (req, res) => {
	try {
        const report = await Report.findOne({ _id: req.params.reportId })
        if(!report) throw "Report not found"
        return res.json({ success: true, report })
    } catch (err) {
        return res.json({ success: false, err })
    }
}

exports.create = async (req, res) => {
	try {
		if(!req.body || !req.body.title) throw "Wrong Body"
		const test = await Test.findOne({ _id: req.params.testId })
		if(!test) throw "Test not found"
		const report = new Report({
			title: req.body.title,
			author: req.user._id,
			testId: test._id,
			testAuthor: test.author
		})
		if(req.body.content) report.content = req.body.content
		await report.save()
		return res.json({ success: true, report })
	} catch (err) {
		return res.json({ success:false, err })
	}
}

exports.updateByAuthor = async (req, res) => {
	try {
		if(!req.body || !req.body.title) throw "Wrong Body"
		const report = await Report.findOne({ _id: req.params.reportId, author: req.user._id })
		if(!report)  throw "Report not found"
		report.title = req.body.title
		if(req.body.content) report.content = req.body.content
		await report.save()
		return res.json({ success: true, report })
	} catch (err) {
		return res.json({ success:false, err })
	}
}

exports.updateByTestAuthor = async (req, res) => {
	try {
		if(!req.body || !req.body.completed) throw "Wrong Body"
		const report = await Report.findOne({ _id: req.params.reportId, testAuthor: req.user._id })
		if(!report) throw "Report not found"
		report.completed = true
		await report.save()
		return res.json({ success:true, report })
	} catch (err) {
		return res.json({ success:false, err })
	}
}

exports.remove = async (req, res) => {
	try {
		const report = await Report.findOne({ _id: req.params.reportId, author: req.user._id })
		if(!report) throw "Report not found"
		await report.remove()
		return res.json({ success: true, report })
	} catch (err) {
		return res.json({ success: false, err })
	}
}