var express = require('express');
const path = require('path');
var router = express.Router();

/* GET cocktails main page */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'cocktails.html'));
});

router.get('/:cocktailId', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'cocktails', req.params.cocktailId) + '.html')
})

module.exports = router;
