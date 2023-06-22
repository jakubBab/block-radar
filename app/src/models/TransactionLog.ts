import mongoose from "mongoose";

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
    },
    transaction: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
}, {autoIndex: false}
);

const model  =  mongoose.model("transactionLog", transactionLog);
model.ensureIndexes();

export {model as TransactionLogModel};
