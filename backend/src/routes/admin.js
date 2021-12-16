const express = require("express")
const router = express.Router()
const AdminContorller = require("../controllers/admin")
const auth = require("../middleware/auth")
const isAdmin = require("../middleware/is_admin")

router.get("/", auth, isAdmin, AdminContorller.home)
router.get("/login", AdminContorller.loginGet)
router.post("/login", AdminContorller.loginPost)

module.exports = router