require("dotenv").config();
const DataTransformerInterface = require("../contract/DataTransformerInterface");


module.exports = class BlockChainDataTransformer extends DataTransformerInterface {

    process(transaction) {
        delete transaction.responseData.result.transactions;

        return {
            "blockChain": process.env.BLOCKCHAIN_NAME,
            "blockNumber": transaction.blockNumber,
            "data": transaction.responseData
        };
    }

};
