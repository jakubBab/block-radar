const mongoose = require('mongoose');

const blockChainDataSchema = new mongoose.Schema({
    blockChain: {
        type: String,
        required: true
    },
    blockNumber: {
        type: Number,
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}
);

module.exports = mongoose.model('blockChainData', blockChainDataSchema)
