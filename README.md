# Project Name

Welcome to the dap-radar test task! 

## Technologies Used

- Node.js
- PHP: 
- Symfony
- RabbitMQ
- MongoDB
- PM2 

## Overview

Application fetches data from pre-defined blocks from one of RPCs defined in [here](https://docs.iotex.io/reference/babel-web3-api#babel-api-endpoints). Should one rpc fail, next one will take over.
Application is using queue service (RabbitMQ) for efficient handling. Consumers are spun with PM2. Data is stored in two collections: 

* blockchaindatas  -> copy of the block
* transactionlogs  -> transactions within the block 


API service aggregates the result so that uawCount, transactionsCount, timeframe can be provided to the user.

## Prerequisites

Make sure you have the following tools installed on your system:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get started with the Project Name, follow the instructions below:

1. Clone the repository:

   ```bash
   git clone git@github.com:jakubBab/block-radar.git

2. Change into the project directory 

   ```bash
   cd block-radar

3. Build and run the Docker containers:
   
   ```bash
   docker-compose up -d

4. Access the application 
   
   * For the API application: http:// 127.0.0.1:8081 
   * For RabbitMQ UI : http://127.0.0.1:15672/#/queues (default credentials: guest/guest)


## Instructions 

1. Log chain data


   * Log in to node container 
        ```bash
      docker exec -it  dapp-node bash
     
   * Start PM2 with pre-defined configuration 
        ```bash
      pm2 start ecosystem.config.js

   * Start index.js
        ```bash
      npm index.js

 

2. Track wallet metrics (API)

   * Open your preferred browser. Enter url: http:// 127.0.0.1:8081/contract/metrics  with walletAddress=<wallet-address> as query parameter eg.
     ```text
     http://127.0.0.1:8081/api/contract/metrics?walletAddress=0x17Df9fBFC1CdAB0f90eDDC318C4f6FcADA730cf2

    If contract is found application will return: 
     ```json
   { 
        "transactionsCount": 564,
        "uawCount": 39,
        "timeFrame": 4141
   }
   ```
   If contract is not recognized the app will return:

     ```json
   { 
        "transactionsCount": 0,
        "uawCount": 0,
        "timeFrame": 4141
   }
    ```
