const express = require("express")
const router = express.Router()

const TestController = require("../controllers/test")
const auth = require("../middleware/auth")

router.get("/all", TestController.getAll)
router.get("/me", auth, TestController.getMe)
router.get("/:testId", TestController.getById)
router.post("/add", auth, TestController.create)
router.put("/:testId", auth, TestController.update)
router.delete("/:testId", auth, TestController.remove)

module.exports = router