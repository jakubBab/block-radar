import {QueueHandle} from "../QueueHandle.js";
import {TransactionLogTransformer} from "../../services/transformer/TransactionLogTransformer.js";

import {TransactionLogModel} from "../../models/TransactionLog.js"
import {connectDb} from "../../config/database.js";

const consume_queue = "transactions";


(async () => {
    await connectDb();

    let queue = QueueHandle.queue;
    await queue.connect();

    await queue.channel.assertQueue(consume_queue);

    const transformer = new TransactionLogTransformer();

    await queue.channel.consume(
        consume_queue,
        (message) => {
            if (message) {
                let content = JSON.parse(message.content.toString());
                let batchTransactions = [];

                for (const transaction of content) {
                    let chainData = transformer.process(transaction);
                    batchTransactions.push(chainData);

                    if (batchTransactions.length % 30 === 0) {
                        TransactionLogModel.insertMany(batchTransactions).catch(error => {
                            console.log(error);
                        });
                        batchTransactions = [];
                    }
                }
                if (batchTransactions.length > 0) {
                    TransactionLogModel.insertMany(batchTransactions).catch(error => {
                        console.log(error);
                    });
                }
            }
        },
        {noAck: true}
    );

})();
