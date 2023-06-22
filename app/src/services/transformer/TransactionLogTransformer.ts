import {DataTransformerInterface} from "../contract/DataTransformerInterface.js";

export class TransactionLogTransformer implements DataTransformerInterface {

    process(transaction: { from: string, to: string, blockNumber: string, [key: string]: any }) {

        if (!Object.prototype.hasOwnProperty.call(transaction, "from")
            || !Object.prototype.hasOwnProperty.call(transaction, "to")) {
            throw new Error("Invalid transaction provided");
        }

        return {
            "addressFrom": transaction.from,
            "addressTo": transaction.to,
            "blockNumber": transaction.blockNumber,
            "transaction": transaction
        };
    }

};
