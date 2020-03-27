var express = require('express');
var router = express.Router();

const memberController = require('../controler/member');


router.get('/',memberController.getMembers);

router.post('/',memberController.createMember);

module.exports = router;