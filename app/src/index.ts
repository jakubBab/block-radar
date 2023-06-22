import * as dotenv from "dotenv";
import {BlockchainDataFetcher} from "./services/BlockDataFetchService.js"
import {QueueHandle} from "./queue/QueueHandle.js";

dotenv.config();


const blockchainNodes = [
    "https://babel-api.mainnet.iotex.io",
    "https://babel-api.mainnet.iotex.one",
    "https://iotexrpc.com",
    "https://rpc.ankr.com/iotex",
    "https://iotex-rpc.gateway.pokt.network"
];

const startBlock = parseInt(process.env.START_BLOCK);
const endBlock = parseInt(process.env.END_BLOCK);

(async () => {
    const fetcher = new BlockchainDataFetcher(blockchainNodes);
    const blockDataGenerator = fetcher.fetchBlocks(startBlock, endBlock);

    for await (const responseData of blockDataGenerator) {
        QueueHandle.push("transactions", JSON.stringify(responseData.responseData.result.transactions));
        QueueHandle.push("chain-data", JSON.stringify(responseData));
    }

})();
