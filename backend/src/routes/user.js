const express = require("express")
const router = express.Router()

const User = require("../model/user")
const Test = require("../model/test")
const auth = require("../middleware/auth")

router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        return res.json({ success: true, users })
    } catch (err) {
        return res.json({success:false, err})
    }
    
})

router.get("/me", auth, async (req, res) => {
    try {
        return res.json({ success:true, user: req.user })
    } catch (err) {
        return res.json({ success:false, err })
    }
})

router.get("/me/logout", auth, async (req, res) => {
    try {
        req.logout()
        return res.json({ success: true })
    } catch (err) {
        return res.json({ success: false, err })
    }
    
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) throw "User not found!";

        return res.json({ success: true, user })
    } catch (err) {
        return res.json({ success:false, err })
    }
    
})

router.get("/:id/tests", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) throw "User not found!"
        const tests = await Test.find({author: req.params.id}).sort({createdAt:-1})
        if(!tests || tests.length == 0) throw "This user hasn't any test!"
        return res.json({ success: true, tests })
    } catch (err) {
        return res.json({ success:false, err })
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if(!user) throw "User not found!"
        const token = await user.generateToken()
        return res.json({ success:true, token })
    } catch (err) {
        return res.json({ success:false, err })
    }
})

router.post("/sign", async (req, res) => {
    try {
        if(!req.body) throw "Wrong body!";
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        })
        await user.save()
        return res.json({ success: true })
    } catch (err) {
        return res.json({ success: false, err })
    }
})

router.put("/me", auth, async (req, res) => {
    try {
        if(!req.body || !req.body.name) throw "Wrong body!"
        req.user.name = req.body.name
        req.user.save()

        return res.json({ success: true, user: req.user })
    } catch (err) {
        return res.json({ success:false, err })
        
    }
})

router.delete("/me", auth, async (req, res) => {
    try {
        await req.logout(true)
        res.json({ success: true })
    } catch (err) {
        res.json({ success:false, err })
    }
})

module.exports = router
