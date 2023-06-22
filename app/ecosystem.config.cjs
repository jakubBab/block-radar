module.exports = {
    apps: [
        {
            name: "consumer-blockchain",
            script: "./dist/queue/consumer/BlockChainConsumer.js",
            instances: 3,
            autorestart: true
        },
        {
            name: "consumer-transaction-consumer",
            script: "./dist/queue/consumer/TransactionConsumer.js",
            instances: 3,
            autorestart: true
        },
    ]
};
