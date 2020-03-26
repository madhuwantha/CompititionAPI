var express = require('express');
var router = express.Router();

const teamController = require('../controler/team');

router.get('/',teamController.getTeams);

router.post('/',teamController.createTeam);

module.exports = router;