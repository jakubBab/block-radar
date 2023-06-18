const mongoose = require("mongoose");

const blockChainDataSchema = new mongoose.Schema({
    blockChain: {
        type: String,
        required: true
    },
    blockNumber: {
        type: Number,
        required: true,
        index: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
},
{autoIndex: false}
);

const model = mongoose.model("blockChainData", blockChainDataSchema);
model.ensureIndexes();

module.exports = model;
