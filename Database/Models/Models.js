const mongoose = require("mongoose");
const { ResisterSchema } = require("../Schema/Schema");


const UserModel = mongoose.model("User", ResisterSchema)

module.exports = {UserModel}
