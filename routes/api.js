var express = require('express');
var router = express.Router();
var db = require('mongoskin').db('mongodb://localhost:27017/users', {native_parser:true});
db.bind('ruts');

/* GET version API */
router.get('/', function(req, res, next) {
   res.json({version: '1.0.0'});
});

router.get('/user', function(req, res, next) {
  res.json({username: 'test'});
});

module.exports = router;
