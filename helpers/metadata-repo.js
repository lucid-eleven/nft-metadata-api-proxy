const { ethers } = require("ethers");
const ERC721_ABI = require("../abi/ERC721.json");
const CacheService = require("../cache");
const fetch = require("node-fetch");

const ttl = 30; //cache for 30 seconds by default, overriden to 0 (unlimited) for getById below;
const cache = new CacheService(ttl);

const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);

const MetadataRepo = {
  validateCollection(collection) {
    let collectionName = collection.toUpperCase();

    if (
      process.env[`SOURCE_BASE_URI_${collectionName}`] == null ||
      process.env[`CONTRACT_ADDRESS_${collectionName}`] == null
    ) {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  },

  getTotalSupply(collection) {
    let collectionName = collection.toUpperCase();

    return cache
      .get(`${collectionName}_TotalSupply`, () =>
        cache
          .get(
            `${collectionName}_Contract`,
            () =>
              Promise.resolve(
                new ethers.Contract(process.env[`CONTRACT_ADDRESS_${collectionName}`], ERC721_ABI, provider)
              ),
            0
          )
          .then((erc721Contract) => erc721Contract.totalSupply())
          .then((bigNumber) => bigNumber.toNumber())
      )
      .then((total) => {
        return total;
      });
  },

  getToken(collection, id) {
    let collectionName = collection.toUpperCase();

    return cache
      .get(
        `${collectionName}_Token_${id}`,
        () =>
          cache
            .get(
              `${collectionName}_Contract`,
              () =>
                Promise.resolve(
                  new ethers.Contract(process.env[`CONTRACT_ADDRESS_${collectionName}`], ERC721_ABI, provider)
                ),
              0
            )
            .then((erc721Contract) => erc721Contract.ownerOf(id))
            .then(() => true)
            .catch(() => false)
            .then((exists) => {
              if (exists) {
                return fetch(`${process.env[`SOURCE_BASE_URI_${collectionName}`]}${id}`, { method: "GET" })
                  .then((res) => {
                    if (res.status != 200) {
                      throw new Error(res.statusText);
                    }
                    return res.json();
                  })
                  .then((data) => {
                    return data;
                  });
              } else {
                throw Error(`Token ${id} doesn't exist`);
              }
            }),
        0
      )
      .catch((error) => error.message);
  },
};

module.exports = MetadataRepo;
