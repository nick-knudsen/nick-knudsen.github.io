var express = require('express');
const path = require('path');
var router = express.Router();

/* GET code main page */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'code.html'));
});

module.exports = router;
