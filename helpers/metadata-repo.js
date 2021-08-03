const { ethers } = require('ethers')
const ERC721_ABI = require('../contracts/ERC721.json')
const CacheService = require('../cache')
const fetch = require('node-fetch');

const ttl = 30; //cache for 30 seconds;
const cache = new CacheService(ttl);

const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
const erc721Contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ERC721_ABI.abi, provider);

const MetadataRepo = {
  getAll() {
    return cache.get("TotalSupply", () => erc721Contract.totalSupply().then((bigNumber) => bigNumber.toNumber()))
      .then((total) => {
        return total;
      });
  },
  
  getById(id) {
    return cache.get(`Token_${id}`, () => {
        return erc721Contract
          .ownerOf(id)
          .then(() => true)
          .catch(() => false);
      })
      .then((exists) => {
        if (exists) {
          return fetch(`${process.env.SOURCE_BASE_URI}${id}`, {method: 'GET'})
            .then(res => {
              return res.json();
            })
        } else {
          return { error: `Token ${id} doesn't exist`};
        }
      });
  }
};

module.exports = MetadataRepo;


