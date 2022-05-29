const express = require("express")
const router = express.Router()

const TestController = require("../controllers/test")
const auth = require("../middleware/auth")

router.get("/all", TestController.getAll)
router.get("/me", auth, TestController.getMe)
router.get("/:testId", TestController.getById)
router.post("/add", auth, TestController.create)
router.post("/:testId/add", auth, TestController.createQuestion)
router.put("/:testId", auth, TestController.update)
router.put("/:testId/:questionId", auth, TestController.updateQuestion)
router.delete("/:testId", auth, TestController.remove)
router.delete("/:testId/:questionId", auth, TestController.removeQuestion)

module.exports = router