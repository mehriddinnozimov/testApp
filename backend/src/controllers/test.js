const Test = require("../model/test")

exports.getAll =  async (req, res) => {
    let query = {};
    if(req.query) query = req.query;
    const tests = await Test.find(query).sort({createdAt:-1})
    return res.json({ success: true, tests })
}

exports.getMe = async (req, res) => {
    try {
        console.log(req.user._id)
        const tests = await Test.find({author:req.user._id}).sort({createdAt:-1})
        return res.json({success:true, tests})
    } catch (err) {
        return res.json({success: false, err})
    }
   
}

exports.getById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id)
        return res.json({ success: true, test })
    } catch (err) {
        return res.json({ success: false, err })
    }
}

exports.create = async (req, res) => {
    try {
        if(!req.body) throw new Error("bo`sh body tufayli jarayon rad etildi")
        const test = new Test({
            title: req.body.title,
            subject: req.body.subject,
            difficulty: parseInt(req.body.difficulty),
            author: req.user._id,
            data: req.body.data
        })
        await test.save()
        return res.json({ success: true, test })
    } catch (err) {
        return res.json({ success: false, err })
    }
}

exports.update = async (req, res) => {
    try {
        const test = await Test.findOneAndUpdate({_id:req.params.id, author:req.user._id}, req.body)
        return res.json({success: true, test})
    } catch (err) {
        return res.json({success: false, err})
    }
}

exports.remove = async (req, res) => {
    try {
        let test = await Test.findOne({_id:req.params.id, author:req.user._id})
        test = await test.remove()
        res.json({ success: true, test })
    } catch (err) {
        res.json({ success:false, err })
    }
}