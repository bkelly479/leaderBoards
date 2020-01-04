var express = require('express');
var secured = require('../lib/middleware/secured.js');
var router = express.Router();

/* GET users listing. */
router.get('/', secured(), function(req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;

  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
