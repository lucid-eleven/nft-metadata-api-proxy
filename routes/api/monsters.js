var express = require('express');
var router = express.Router();
var monsterRepo = require('../../helpers/monster-repo')

// Explanation: A nameless path GET request without any parameters.
// We'll learn how to name a path in users route.
router.get('/', function(req, res, next) {
  monsterRepo.getAll()
    .then((totalSupply) => {
      return res.json({totalSupply: totalSupply});
    })
});

router.get('/:tokenId', function(req, res, next) {
  let tokenId = req.params.tokenId;
  monsterRepo.getById(tokenId)
    .then((data) => {
      return res.json(data);
    });
});

module.exports = router;