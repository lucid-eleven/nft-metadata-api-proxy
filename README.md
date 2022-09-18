# NFT Metadata Proxy

This is a nodejs + express webserver that acts as a proxy server to hide the metadata for unminted tokens in a NFT collection.

With this proxy you can pre-upload all of your metadata to IPFS or some other hosting provider, and not be afraid of users taking a peek at your entire collection before it's been minted.

Supports multiple collections.

# Starting up

Make sure you have the latest Node.js installed, clone the repo and then type

`npm install`

followed by

`npm start`

Alternatively, you can easily host this on Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Configuration

All configuration is done via environment variables, which are as follows:
| Env Var | Description |
| ----------- | ----------- |
| ETHEREUM_RPC_URL | An endpoint for an Ethereum RPC provider, e.g. [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/) |
| CONTRACT_ADDRESS\_**{COLLECTION_NAME}** | Ethereum address for the NFT Smart Contract |
| SOURCE_BASE_URI\_**{COLLECTION_NAME}** | The base url for your full source metadata, don't forget the trailing `/` |

**`COLLECTION_NAME`** should be replaced by a name you want to use for your collection, and this name will also be part of the URL that you will use to access the API as below.

This way you can configure multiple collections with unique **`COLLECTION_NAME`** values.

# Using this proxy

Once the webserver is running, you can request token metadata at

`localhost:3000/collection/{COLLECTION_NAME}/{tokenId}`

If you're hosting on Heroku or some other hosting provider you will replace `localhost:3000` with whatever the base url for your app is.

Test to make sure that it only returns the metadata for tokenIds that actually exist in your smart contract.

Once everything is working as expected, update the baseURI in your smart contract to the url of this server.
