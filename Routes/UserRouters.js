const express = require('express')
const { Resister, Login, UpdateUser } = require('../Database/Controllers/Contollers')

const UserRouter = express.Router()

UserRouter.post("/resister", Resister)
UserRouter.post("/login", Login);

UserRouter.put("/update/:id",UpdateUser)

module.exports = UserRouter