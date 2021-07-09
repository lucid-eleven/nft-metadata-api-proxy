const { ethers } = require('ethers')
const MONSTER_REHAB_ABI = require('../contracts/MonsterRehab.json')
const contractAddresses = require('../contracts/contract-address.json')
const monsterData = require('../monster-data.json')
const CacheService = require('../cache')

const ttl = 30; //cache for 30 seconds;
const cache = new CacheService(ttl);

const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_MAINNET_RPC_URL);
const monsterRehabContract = new ethers.Contract(contractAddresses.mainnet.MonsterRehab, MONSTER_REHAB_ABI.abi, provider);

const MonsterRepo = {
  getAll() {
    return cache.get("MonsterTotalSupply", () => monsterRehabContract.totalSupply().then((bigNumber) => bigNumber.toNumber()))
      .then((total) => {
        return total;
      });
  },
  
  getById(id) {
    return cache.get("MonsterTotalSupply", () => {
        return monsterRehabContract.totalSupply()
          .then((totalSupplyBigNumber) => {
            return totalSupplyBigNumber.toNumber()
          });
      })
      .then((total) => {
        if (parseInt(total) < parseInt(id)) {
          return { error: 'Cheeky cheeky.. mint the monster first!'};
        } else {
          return monsterData[id-1];
        }
      });
  }
};

module.exports = MonsterRepo;


