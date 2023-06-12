require('dotenv').config();

const {mongoose} = require('mongoose')
const url = process.env.DB_MONGO;

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(url, {});
        console.log('connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
module.exports = connectDb;

