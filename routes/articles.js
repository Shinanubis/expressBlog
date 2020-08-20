var express = require('express');
var router = express.Router();

/* GET articles listing. */
router.get('/', function(req, res, next) {
  res.render('articles/index');
});

router.get('/:id', function(req, res, next) {
  res.render('articles/article', {id: req.params.id});
});

router.get('/article/new', function(req, res, next) {
  res.render('articles/create');
});

module.exports = router;
