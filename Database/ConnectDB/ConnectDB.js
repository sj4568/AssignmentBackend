const moongse = require('mongoose')

const ConnectDB = async () => {
    try {
        const con = await moongse.connect(`${process.env.MONGODB_PORT}/assignment`)
        console.log(`Database is Connected on ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = ConnectDB