# NFT Metadata Proxy

This is a nodejs + express webserver that acts as a proxy server to hide the metadata for unminted tokens in a NFT collection.

With this proxy you can pre-upload all of your metadata to IPFS or some other hosting provider, and not be afraid of users taking a peek at your entire collection before it's been minted.

# Starting up

Make sure you have the latest Node.js installed, clone the repo and then type

`npm install`

followed by 

`npm start`

Alternatively, you can easily host this on Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Configuration

All configuration is done via environment variables, which are as follows:
| Env Var      | Description |
| ----------- | ----------- |
| CONTRACT_ADDRESS      | Ethereum address for the NFT Smart Contract       |
| ETHEREUM_RPC_URL   | An endpoint for an Ethereum RPC provider, e.g. [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/) |
| SOURCE_BASE_URI   | The base url for your full source metadata, don't forget the trailing `/`  |
