const express = require("express")
const router = express.Router()

const UserController = require("../controllers/user")
const auth = require("../middleware/auth")

router.get("/", UserController.getAll)
router.get("/me", auth, UserController.getMe)
router.get("/me/logout", auth, UserController.logout)
router.get("/:id", UserController.getById)
router.get("/:id/tests", UserController.getTestByUser)
router.post("/login", UserController.login)
router.post("/sign", UserController.register)
router.put("/me", auth, UserController.updateUser)
router.delete("/me", auth, UserController.removeUser)

module.exports = router
