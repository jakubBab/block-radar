const DataTransformerInterface = require('../contract/DataTransformerInterface')

module.exports = class TransactionLogTransformer extends DataTransformerInterface {

    process(transaction) {

        if (!Object.prototype.hasOwnProperty.call(transaction, 'from')
            || !Object.prototype.hasOwnProperty.call(transaction, 'to')) {
            throw new Error('Invalid transaction provided')
        }

        return {
            'addressFrom': transaction.from,
            'addressTo': transaction.to,
            'block': transaction.blockNumber,
            'hash': transaction.hash
        };
    }

}
