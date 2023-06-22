import {QueueHandle} from "../QueueHandle.js";
import {BlockChainDataTransformer} from "../../services/transformer/BlockChainDataTransformer.js";
import {connectDb} from "../../config/database.js";
import {BlockChainModel} from "../../models/BlockChainModel.js";

const consume_queue = "chain-data";

(async () => {
    await connectDb();

    const queue = QueueHandle.queue;
    await queue.connect();

    await queue.channel.assertQueue(consume_queue);

    const transformer = new BlockChainDataTransformer();
    await queue.channel.consume(
        consume_queue,
        (message) => {
            if (message) {
                const content = JSON.parse(message.content.toString());
                const chainData = transformer.process(content);

                BlockChainModel.insertMany(chainData).catch(error => {
                    console.log(error);
                });

                console.log(
                    " [x] Received '%s'",
                    JSON.parse(message.content.toString())
                );
            }
        },
        {noAck: true}
    );

})();
