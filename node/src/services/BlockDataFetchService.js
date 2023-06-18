const Converter = require("./hexConverter");
const axios = require("axios");
const {Error} = require("mongoose");

class BlockchainDataFetcher {

    constructor(blockChainNodes) {
        this.nodes = blockChainNodes;
        this.rpcData = {
            "id": 1,
            "jsonrpc": "2.0",
            "method": "eth_getBlockByNumber",
            "params": []
        };

    }

    async* fetchBlocks(startBlock, endBlock) {
        try {
            for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
                const responseData = await this.#fetchFromBlockchain(blockNumber);
                yield {
                    responseData: responseData,
                    blockNumber: blockNumber
                };
            }
        } catch (error) {
            console.error("An error occurred while fetching and saving block data:", error);
        }
    }

    async getResponse(node, blockNumber) {
        let response;

        try {
            response = await axios.post(
                node,
                this.getRpcData(blockNumber)
            );

            if (Object.prototype.hasOwnProperty.call(response, "error")) {
                // noinspection ExceptionCaughtLocallyJS
                throw new Error(`Request to ${node} failed.`);
            }

        } catch (err) {
            throw `Request to ${node} failed. Trying next node...`;
        }

        return response.data;
    }

    async #fetchFromBlockchain(blockNumber) {

        let error;
        for (const node of this.nodes) {
            try {
                return await this.getResponse(node, blockNumber);
            } catch (err) {
                error = err;
                console.error(`Request to ${node} failed. Trying next node...`);
            }
        }

        console.error(`All nodes failed for block number ${blockNumber}. Unable to fetch data.`);
        throw error;

    }

    getRpcData(blockNumber) {
        let data = this.rpcData;
        data.params = [Converter.decimalToHex(blockNumber), true];

        return data;
    }

}

module.exports = BlockchainDataFetcher;
