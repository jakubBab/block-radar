const mongoose = require('mongoose');

const transactionLog = new mongoose.Schema({
        addressFrom: {
            type: String,
            required: true
        },
        addressTo: {
            type: String,
            required: true
        },
        block: {
            type: String,
            required: true
        },
        hash: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('transactionLog', transactionLog)
