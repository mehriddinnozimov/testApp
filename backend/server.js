require('dotenv').config({ path: './src/config/.env' })
const db = require("./src/db/mongoose")
const defaultDB = require("./src/db/defaultDB")

const http = require("http")
const app = require("./app")

const server = http.createServer(app)

const port = process.env.PORT
server.listen(port, () => {
	db()
	defaultDB()
    console.log(`http://localhost:${port}`)
})