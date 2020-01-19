var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:boardID', function(req, res, next) {
  res.render('board.html', {"title": "Board with mustache"});
});

module.exports = router;
