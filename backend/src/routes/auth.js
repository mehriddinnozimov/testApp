const express = require("express")
const router = express.Router()

const authController = require("../controllers/auth")

router.get("/google", authController.getGoogle)
router.get("/google/callback", authController.getGoogleCallBack)
router.get("/logout", authController.logout)
router.get("/failure", authController.failure)
router.get("/success", authController.success)

module.exports = router