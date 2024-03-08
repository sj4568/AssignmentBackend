
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const IsToken =async (req, res, next) => {
    try {
        const valid = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        console.log(valid);
    } catch (error) {
        console.log(error);
    }
}