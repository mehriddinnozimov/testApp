const express = require("express")
const router = express.Router()

const TestController = require("../controllers/test")
const auth = require("../middleware/auth")

router.get("/all", TestController.getAll)
router.get("/me", auth, TestController.getMe)
router.get("/:id", TestController.getById)
router.post("/add", auth, TestController.create)
router.delete("/:id", auth, TestController.remove)

module.exports = router