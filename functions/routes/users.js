var express = require('express');
var router = express.Router();

const userController = require('../controler/user');

router.get('/', function(req, res, next) {
  res.send('respond with a user');
});

router.get('/:doc',userController.getUser)

router.post("/",userController.createUser);

module.exports = router;
