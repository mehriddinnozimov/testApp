const express = require("express")
const router = express.Router()

const UserController = require("../controllers/user")
const auth = require("../middleware/auth")

router.post("/login", UserController.login)
router.get("/login/passport", UserController.loginWithPassport)
router.post("/sign", UserController.register)
router.put("/me", auth, UserController.update)
router.delete("/me", auth, UserController.remove)

router.get("/", UserController.getAll)
router.get("/me", auth, UserController.getMe)
router.get("/me/logout", auth, UserController.logout)
router.get("/:userId", UserController.getById)
router.get("/:userId/tests", UserController.getTestByUser)


module.exports = router
