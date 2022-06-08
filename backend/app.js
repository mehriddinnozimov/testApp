const express = require("express")
const app = express()

const path = require("path")
const bodyParser = require("body-parser")
const expressLayouts = require("express-ejs-layouts")
const helmet = require("helmet")
const cookieSession = require("cookie-session")

const passport = require("./src/middleware/passport")


app.use(helmet())
app.use(cookieSession({
	name: 'session',
	maxAge: 24 * 60 * 60 * 1000,
	keys: [process.env.COOKIE_SECRET_N1, process.env.COOKIE_SECRET_N2]
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(expressLayouts)
app.use(express.static(path.join(__dirname, '/src/statics')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set("views", "./src/views")
app.set("view engine", "ejs")

app.use("/users", require("./src/routes/user"))
app.use("/auth", require("./src/routes/auth"))
app.use("/tests", require("./src/routes/test"))
app.use("/reports", require("./src/routes/report"))
app.use("/results", require("./src/routes/result"))
app.use("/admin", require("./src/routes/admin"))


module.exports = app