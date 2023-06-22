import {QueueHandle} from "../QueueHandle.js";
import {TransactionLogTransformer} from "../../services/transformer/TransactionLogTransformer.js";

import {TransactionLogModel} from "../../models/TransactionLog.js";
import {connectDb} from "../../config/database.js";

const consume_queue = "transactions";


(async () => {
    await connectDb();

    const queue = QueueHandle.queue;
    await queue.connect();

    await queue.channel.assertQueue(consume_queue);

    const transformer = new TransactionLogTransformer();

    await queue.channel.consume(
        consume_queue,
        (message) => {
            if (message) {
                const content = JSON.parse(message.content.toString());
                let batchTransactions = [];

                for (const transaction of content) {
                    const chainData = transformer.process(transaction);
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
