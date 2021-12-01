const express = require("express")
const router = express.Router()

const Test = require("../model/test")
const auth = require("../middleware/auth")

router.get("/all", async (req, res) => {
    let query = {};
    if(req.query) query = req.query;
    const tests = await Test.find(query).sort({createdAt:-1})

    res.json({
        success: true,
        data: tests
    })
})

router.get("/:id", async (req, res) => {
    try {
        const test = await Test.findById(req.params.id)

        res.json({
            success: true,
            data: test
        })

    } catch (e) {
        res.json({
            success: false,
            data: {
                message: "Test topilmadi",
                err: e
            }
        })
    }
})

router.post("/add", auth, async (req, res) => {
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

        res.json({
            success: true,
            data: {
                message: "Test yaratildi"
            }
        })
    } catch (e) {
        res.json({
            success: false,
            data: {
                message: "Test yaratilishda xatolik ro`y berdi",
                err: e
            }
        })
    }
})

router.delete("/:id", auth, async (req, res) => {
    try {
        let test = await Test.findById(req.params.id)
        if(test.author.toString() !== req.user._id.toString()) throw new Error("jarayon uchun tegishli ruhsat berilmagan");
        await test.remove()

        res.json({
            success: true,
            data : {
                message: "Test muvaffaqiyatli o`chirildi"
            }
        })
    } catch (e) {
        res.json({
            success:false,
            data : {
                message: "Testni o`chirishda xatolik ro`y berdi",
                err: e
            }
        })
    }
})

module.exports = router