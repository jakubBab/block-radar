const DataTransformerInterface = require('../contract/DataTransformerInterface')

module.exports = class TransactionLogTransformer extends DataTransformerInterface {

    process(transaction) {
        if (!transaction.hasOwnProperty('from')
            || !transaction.hasOwnProperty('to')) {
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
