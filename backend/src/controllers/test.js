const Test = require("../model/test")
const Question = require("../model/question")

exports.getAll =  async (req, res) => {
    let query = {};
    if(req.query) query = req.query;
    const tests = await Test.find(query).sort({createdAt:-1})
    return res.json({ success: true, tests })
}

exports.getMe = async (req, res) => {
    try {
        const tests = await Test.find({author:req.user._id}).sort({createdAt:-1})
        return res.json({success:true, tests})
    } catch (err) {
        return res.json({success: false, err})
    }
   
}

exports.getById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.testId)
        return res.json({ success: true, test })
    } catch (err) {
        return res.json({ success: false, err })
    }
}

exports.create = async (req, res) => {
    try {
        if(!req.body || !req.body.title || !req.body.subject || !req.body.difficulty) throw new Error("Wrong Body")
        const test = new Test({
            title: req.body.title,
            subject: req.body.subject,
            difficulty: parseInt(req.body.difficulty),
            author: req.user._id
        })
        if(req.body.data) {
            req.body.data.forEach(async (item) => {
                if(!(item.variants && item.variants.some(a => a.isAnswer == true) && item.variants.every(a => a.value))) throw new Error("Wrong Body")
                let question = new Question({
                    question: item.question,
                    testId: test._id,
                    variants: variants
                })
                test.data.push(question)
                await question.save()
            })
        }
        await test.save()
        return res.json({ success: true, test })
    } catch (err) {
        return res.json({ success: false, err })
    }
}

exports.update = async (req, res) => {
    try {
        const test = await Test.findOneAndUpdate({_id:req.params.testId, author:req.user._id}, req.body)
        return res.json({success: true, test})
    } catch (err) {
        return res.json({success: false, err})
    }
}

exports.remove = async (req, res) => {
    try {
        let test = await Test.findOne({_id:req.params.testId, author:req.user._id})
        test = await test.remove()
        res.json({ success: true, test })
    } catch (err) {
        res.json({ success:false, err })
    }
}