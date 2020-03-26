var express = require('express');
var router = express.Router();

const markPointCpontroller = require('../controler/markPoint');

router.get('/',markPointCpontroller.getMarkPoints);

router.post('/',markPointCpontroller.createMarkPoint);

module.exports = router;