var express = require('express');
var router = express.Router();

const markOfTeamController = require('../controler/markOfTeam');

router.post('/',markOfTeamController.createTeamMark);



module.exports = router;