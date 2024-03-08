const bcrypt = require("bcrypt")

const HashPassword = async (password) => {
    try {
        const salt = 10
        const hashpass = await bcrypt.hash(password, salt)
        return hashpass
    } catch (error) {
       console.log(error); 
    }
}

const ComapirePassword = async (yourpass,hashpass) => {
    try {
        return await bcrypt.compare(yourpass,hashpass)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {HashPassword,ComapirePassword}