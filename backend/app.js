require('dotenv').config({ path: './src/config/.env' })
require("./src/db/mongoose")

const express = require("express")
const app = express()

const path = require("path")
const bodyParser = require("body-parser")
const expressLayouts = require("express-ejs-layouts")

app.use(expressLayouts)
app.use(express.static(path.join(__dirname, '/src/statics')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set("views", "./src/views")
app.set("view engine", "ejs")

app.use("/users", require("./src/routes/user"))
app.use("/tests", require("./src/routes/test"))
app.use("/admin", require("./src/routes/admin"))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
