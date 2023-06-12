const queueHandle = require('../QueueHandle');
const transactionLogTransformer = require('../../services/transformer/TransactionLogTransformer')
const model = require('../../models/transactionLog')
const connectDb = require('../../config/database');


const consume_queue = 'transactions';


(async () => {
    connectDb();

    let queue = queueHandle.queue;
    await queue.connect();

    await queue.channel.assertQueue(consume_queue);

    const transformer = new transactionLogTransformer();

    await queue.channel.consume(
        consume_queue,
        (message) => {
            if (message) {
                let content = JSON.parse(message.content.toString());
                let batchTransactions = [];

                for (const transaction of content) {
                    let chainData = transformer.process(transaction)
                    batchTransactions.push(chainData)

                    if (batchTransactions.length % 30 === 0) {
                        model.insertMany(batchTransactions).catch(error => {
                            console.log(error)
                        })
                        batchTransactions = [];
                    }
                }
                if (batchTransactions.length > 0) {
                    model.insertMany(batchTransactions).catch(error => {
                        console.log(error)
                    })
                }
            }
        },
        {noAck: true}
    );

})();
