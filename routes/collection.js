var express = require("express");
var router = express.Router();
var metadataRepo = require("../helpers/metadata-repo");

router.get("/:collection", function (req, res, next) {
  let collectionName = req.params.collection;

  metadataRepo
    .validateCollection(collectionName)
    .then((isValid) => {
      return isValid
        ? metadataRepo.getTotalSupply(collectionName).then((totalSupply) => {
            return res.json({ totalSupply: totalSupply });
          })
        : res.json({ error: `${collectionName} is not configured or is not a valid collection` });
    })
    .catch((error) => res.status(500).send(error));
});

router.get("/:collection/:tokenId", function (req, res, next) {
  let collectionName = req.params.collection;
  let tokenId = parseInt(req.params.tokenId);

  metadataRepo
    .validateCollection(collectionName)
    .then((isValid) => {
      return isValid
        ? metadataRepo.getToken(collectionName, tokenId).then((data) => {
            return res.json(data);
          })
        : res.json({ error: `${collectionName} is not configured or is not a valid collection` });
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
