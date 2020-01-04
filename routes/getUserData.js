var express = require('express');
var secured = require('../lib/middleware/secured.js');
var router = express.Router();

/* GET users listing. */
router.get('/', secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  
  console.log(userProfile)

  res.send(userProfile);
});

module.exports = router;
