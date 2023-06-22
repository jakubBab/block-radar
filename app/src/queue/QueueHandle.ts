import {RabbitMQConnector} from "../config/messeneger.js";
import {BrokerInterface} from "../config/BrokerInterface.js"

class QueueHandle {
    queue: BrokerInterface;

    constructor(queue: BrokerInterface) {
        this.queue = queue;
    }

    push(queue, msg) {
        (async () => {
            // Connect to RabbitMQ
            await this.queue.connect();

            // Send a message to a queue
            await this.queue.sendMessage(queue, msg);
        })();
    }

    close() {
        (async () => {
            // Close the RabbitMQ connection
            await this.queue.close();
        })();
    }
}

const handle: QueueHandle = new QueueHandle(RabbitMQConnector);

export {handle as QueueHandle}
