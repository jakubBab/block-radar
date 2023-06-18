module.exports = {
    apps: [
        {
            name: "consumer-blockchain",
            script: "./queue/consumer/BlockChainConsumer.js",
            instances: 3,
            autorestart: true
        },
        {
            name: "consumer-transaction-consumer",
            script: "./queue/consumer/TransactionConsumer.js",
            instances: 3,
            autorestart: true
        },
    ]
};
