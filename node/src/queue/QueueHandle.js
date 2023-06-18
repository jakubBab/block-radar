const rabbitMQ = require("../config/messeneger");

class QueueHandle {

    constructor(queue) {
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

module.exports = new QueueHandle(rabbitMQ);
