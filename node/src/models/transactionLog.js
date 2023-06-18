const mongoose = require("mongoose");

const transactionLog = new mongoose.Schema({
    addressFrom: {
        type: String,
        required: true
    },
    addressTo: {
        type: String,
        required: true,
        index: true
    },
    blockNumber: {
        type: String,
        required: true,
        index: true
    }
}, {autoIndex: false}
);

const model  =  mongoose.model("transactionLog", transactionLog);
model.ensureIndexes();

module.exports = model;
