const queueHandle = require('../QueueHandle');
const blockChainDataTransformer = require('../../services/transformer/BlockChainDataTransformer')
const blockChainData = require('../../models/nodeTransactionModel')
const connectDb = require('../../config/database');


const consume_queue = 'chain-data';

(async () => {
    connectDb();

    let queue = queueHandle.queue;
    await queue.connect();

    await queue.channel.assertQueue(consume_queue);

    const transformer = new blockChainDataTransformer();
    await queue.channel.consume(
        consume_queue,
        (message) => {
            if (message) {
                let content = JSON.parse(message.content.toString());
                let chainData = transformer.process(content)

                blockChainData.insertMany(chainData).catch(error => {
                    console.log(error)
                })

                console.log(
                    " [x] Received '%s'",
                    JSON.parse(message.content.toString())
                );
            }
        },
        {noAck: true}
    );

})();
