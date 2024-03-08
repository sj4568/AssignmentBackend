const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const ConnectDB = require("./Database/ConnectDB/ConnectDB")
const { Resister } = require("./Database/Controllers/Contollers")
const UserRouter = require("./Routes/UserRouters")
const app = express()
dotenv.config()
app.use(cors())
ConnectDB()
const PORT = process.env.PORT || 8080
app.get("/", (req, res) => {
    res.send("Server is Running")
})
app.use(express.json())

app.use("/auth",UserRouter)
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
})
