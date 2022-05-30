const express = require("express")
const router = express.Router()

const ReportController = require("../controllers/report")
const auth = require("../middleware/auth")

router.get("/", auth, ReportController.getForMe)
router.get("/me", auth, ReportController.getFromMe)
router.get("/tests/:testId", auth, ReportController.getByTestId)
router.get("/:reportId", auth, ReportController.getById)
router.post("/tests/:testId", auth, ReportController.create)
router.put("/:reportId", auth, ReportController.updateByAuthor)
router.patch("/:reportId", auth, ReportController.updateByTestAuthor)
router.delete("/:reportId", auth, ReportController.remove)

module.exports = router