var express = require('express');
var router = express.Router();

const roundController = require('../controler/round');


router.get('/',roundController.getRounds);

router.get('/:doc',roundController.getARound);

router.post('/',roundController.createRound);

router.post('/markpont/:doc',roundController.addAMarkPoint);

module.exports = router;