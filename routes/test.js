var express = require('express');
const path = require('path');
var router = express.Router();

/* GET photography main page */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'test.html'));
});

module.exports = router;
