const express = require("express")
const router = express.Router()

const resultController = require("../controllers/result")
const auth = require("../middleware/auth")

router.get("/", auth, resultController.getMe)
router.get("/tests/:testId", auth, resultController.getByTestId)
router.get("/user/tests/:testId", auth, resultController.getByTestIdForTestCreator)
router.post("/tests/:testId", auth, resultController.create)

module.exports = router