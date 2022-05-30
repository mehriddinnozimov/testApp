const express = require("express")
const app = express()

const path = require("path")
const bodyParser = require("body-parser")
const expressLayouts = require("express-ejs-layouts")
const helmet = require("helmet")

app.use(helmet())
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, '/src/statics')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set("views", "./src/views")
app.set("view engine", "ejs")

app.use("/users", require("./src/routes/user"))
app.use("/tests", require("./src/routes/test"))
app.use("/reports", require("./src/routes/report"))
app.use("/results", require("./src/routes/result"))
app.use("/admin", require("./src/routes/admin"))


module.exports = app