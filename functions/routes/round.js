var express = require('express');
var router = express.Router();

const roundController = require('../controler/round');


router.get('/',roundController.getRounds);

router.post('/',roundController.createRound);

module.exports = router;