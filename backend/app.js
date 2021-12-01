require('dotenv').config({ path: './src/config/.env' })

const express = require("express")
const app = express()

const bodyParser = require("body-parser")

require("./src/db/mongoose")

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/users", require("./src/routes/user"))
app.use("/tests", require("./src/routes/test"))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})