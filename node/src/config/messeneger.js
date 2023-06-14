const amqp = require("amqplib");
require('dotenv').config();

const url = process.env.RABBIT_URL;

class RabbitMQConnector {
    isConnected = false;

    constructor(url) {
        this.url = url;
        this.connection = null;
        this.channel = null;
    }

    async connect() {

        if (this.isConnected) {
            return;
        }
        try {
            this.connection = await amqp.connect(this.url);
            this.channel = await this.connection.createChannel();
            this.isConnected = true;
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
        }
    }

    async sendMessage(queue, message) {
        try {
            if (!this.channel) {
                throw new Error('RabbitMQ channel is not initialized');
            }
            await this.channel.assertQueue(queue);
            this.channel.sendToQueue(queue, Buffer.from(message));
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    async consume(queue) {
        return new Promise(async (resolve, reject) => {
            try {
                this.connection = await amqp.connect(this.url);
                this.channel = await this.connection.createChannel();


                // Ensure the queue exists before consuming messages
                await this.channel.assertQueue(queue);

                // Start consuming messages from the queue
                this.channel.consume(queue, (message) => {
                    if (message) {
                        const messageContent = message.content.toString();
                        console.log('Received message:', messageContent);
                        this.channel.ack(message);
                        resolve(messageContent);
                    }
                });
            } catch (error) {
                console.error('Error connecting to RabbitMQ:', error);
                reject(error);
            }
        });
    }

    async close() {
        try {
            await this.channel.close();
            await this.connection.close();
            console.log('RabbitMQ connection closed');
        } catch (error) {
            console.error('Error closing RabbitMQ connection:', error);
        }
    }
}

module.exports = new RabbitMQConnector(url);
