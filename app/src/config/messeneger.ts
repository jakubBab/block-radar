import {BrokerInterface} from "./BrokerInterface.js";
import * as dotenv from "dotenv";
import amqp from "amqplib";


dotenv.config();


const url = process.env.RABBIT_URL;

class RabbitMQConnector implements BrokerInterface {
    private isConnected = false;
    private connection: any;
    public channel: any;
    private readonly url: any;

    constructor(url) {
        this.url = url;
        this.connection = null;
        this.channel = null;
    }

    async connect(): Promise<boolean> {

        if (this.isConnected) {
            return;
        }
        try {
            this.connection = await amqp.connect(this.url);
            this.channel = await this.connection.createChannel();
            this.isConnected = true;
        } catch (error) {
            console.error("Error connecting to RabbitMQ:", error);
        }
    }

    async sendMessage(queue, message): Promise<void> {
        try {
            if (!this.channel) {
                // noinspection ExceptionCaughtLocallyJS
                throw new Error("RabbitMQ channel is not initialized");
            }
            await this.channel.assertQueue(queue);
            this.channel.sendToQueue(queue, Buffer.from(message));
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    async consume(queue): Promise<any> {
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
                        console.log("Received message:", messageContent);
                        this.channel.ack(message);
                        resolve(messageContent);
                    }
                });
            } catch (error) {
                console.error("Error connecting to RabbitMQ:", error);
                reject(error);
            }
        });
    }

    async close(): Promise<any> {
        try {
            await this.channel.close();
            await this.connection.close();
            console.log("RabbitMQ connection closed");
        } catch (error) {
            console.error("Error closing RabbitMQ connection:", error);
        }
    }
}

const rabbit = new  RabbitMQConnector(url);
export {rabbit as RabbitMQConnector};
