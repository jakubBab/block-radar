import {DataTransformerInterface} from "../contract/DataTransformerInterface.js";
import * as dotenv from "dotenv";

dotenv.config();


export class BlockChainDataTransformer implements DataTransformerInterface {
    process(transaction: { responseData: { result: { transactions } }, blockNumber: string }) {
        delete transaction.responseData.result.transactions;

        return {
            "blockChain": process.env.BLOCKCHAIN_NAME,
            "blockNumber": transaction.blockNumber,
            "data": transaction.responseData
        };
    }

}
