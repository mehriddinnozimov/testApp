const Test = require("../model/test")
const Question = require("../model/question")
const User = require("../model/user")

exports.getAll =  async (req, res) => {
    let query = {}
    if(req.query) query = req.query;
    const tests = await Test.find(query).sort({createdAt:-1}).populate("data")
    return res.json({ success: true, tests })
}

exports.getMe = async (req, res) => {
    try {
        const tests = await Test.find({author:req.user._id}).sort({createdAt:-1}).populate("data")
        return res.json({success:true, tests})
    } catch (err) {
        return res.json({success: false, err})
    }
   
}

exports.getById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.testId).populate("data")
        if(!test) throw "Test not found"
        return res.json({ success: true, test })
    } catch (err) {
        return res.json({ success: false, err })
    }
}

exports.create = async (req, res) => {
    try {
        if(!req.body || !req.body.title || !req.body.subject || !req.body.difficulty) throw "Wrong Body"
        const test = new Test({
            title: req.body.title,
            subject: req.body.subject,
            difficulty: parseInt(req.body.difficulty),
            author: req.user._id
        })
        if(req.body.data) {
            let dataError = false
            req.body.data.forEach(async (item) => {
                if(!item.title || !item.variants || !(item.variants.some(a => a.isAnswer) && item.variants.every(a => a.value))) {
                    dataError = true
                    return
                }
                let question = new Question({
                    title: item.title,
                    testId: test._id,
                    variants: item.variants
                })
                test.data.push(question._id)
                await question.save()
            })
            if(dataError) throw "Wrong Body"
        }
        await test.save()
        return res.json({ success: true, test })
    } catch (err) {
        return res.json({ success: false, err })
    }
}

exports.createQuestion = async (req, res) => {
    try {
        if(!req.body || !req.body.title || !req.body.variants || !(req.body.variants.some(a => a.isAnswer == true) && req.body.variants.every(a => a.value))) throw "Wrong Body"
        const test = await Test.findOne({ _id: req.params.testId, author: req.user._id })
        if(!test) throw "Test not found"
        const question = new Question({
            title: req.body.title,
            testId: test._id,
            variants: req.body.variants
        })
        await question.save()
        test.data.push(question._id)
        await test.save()
        return res.json({ success:true, question })
    } catch (err) {
        return res.json({ success: false, err })
    }
}

exports.update = async (req, res) => {
    try {
        if(!req.body || !req.body.title || !req.body.subject || !req.body.difficulty) throw "Wrong Body"
        const test = await Test.findOne({ _id:req.params.testId, author:req.user._id })
        if(!test) throw "Test not found"
        test.title = req.body.title
        test.subject = req.body.subject
        test.difficulty = req.body.difficulty
        await test.save()
        return res.json({ success: true, test })
    } catch (err) {
        return res.json({success: false, err})
    }
}

exports.updateQuestion = async (req, res) => {
    try {
        if(!req.body || !req.body.title || !req.body.variants || !(req.body.variants.some(a => a.isAnswer == true) && req.body.variants.every(a => a.value))) throw "Wrong Body"
        const test = await Test.findOne({ _id: req.params.testId, author: req.user._id })
        if(!test) throw "Test not found"
        const question = await Question.findOne({ _id: req.params.questionId, testId: test._id })
        question.title = req.body.title
        question.variants = req.body.variants
        await question.save()
        return res.json({ success: true, question })
    } catch (err) {
        return res.json({ success: false, err})
    }
}


exports.remove = async (req, res) => {
    try {
        let test = await Test.findOne({_id:req.params.testId, author:req.user._id})
        if(!test) throw "Test not found"
        await test.remove()
        ////  test o`chirilgandan so`ng defaultTest nomli testga savollar o`tqaziladi
        // const defaultUser  = await User.findOne({ email: "defaultUser@def.com" })
        // const defaultTest = await Test.findOne({ subject: "default", author: defaultUser._id })
        // const questions = await Question.find({testId: test._id})
        // questions.forEach(async (question) => {
        //     question.testId = defaultTest._id
        //     defaultTest.data.push(question._id)
        //     await question.save()
        // })
        // await defaultTest.save()

        //// test o`chiriladi, savollar ham
        await Question.deleteMany({ testId: test._id })
        res.json({ success: true, test })
    } catch (err) {
        res.json({ success:false, err })
    }
}

exports.removeQuestion = async (req, res) => {
    try {
        const test = await Test.findOne({_id:req.params.testId, author:req.user._id})
        if(!test) throw "Test not found"
        const question = await Question.findOne({ _id: req.params.questionId, testId: test._id })
        if(!question) throw "Question not found"
        await question.remove()
        test.data = test.data.filter(a => a != question._id)
        await test.save()
        res.json({ success: true, question })
    } catch (err) {
        res.json({ success:false, err })
    }
}