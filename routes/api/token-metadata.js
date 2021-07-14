var express = require('express');
var router = express.Router();
var metadataRepo = require('../../helpers/metadata-repo')

router.get('/', function(req, res, next) {
  metadataRepo.getAll()
    .then((totalSupply) => {
      return res.json({totalSupply: totalSupply});
    })
});

router.get('/:tokenId', function(req, res, next) {
  let tokenId = parseInt(req.params.tokenId);
  metadataRepo.getById(tokenId)
    .then((data) => {
      return res.json(data);
    });
});

module.exports = router;