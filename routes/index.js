var express = require('express');
var router = express.Router();
var transactions = require('../transactions/shortenerTransaction');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:urlShort', function (req, res, next) {

  let urlShort = req.params.urlShort;
  var db = req.db;

  transactions.GetFindUrlShort(db, urlShort, function (result) {

    if (result.internalError) {
      res.render('index', { title: 'Error' });
      return;
    }

    if (!result.transactionDone) {
      res.render('index', { title: 'Error' });
      return;
    }

    if (result.transactionDone) {
      res.redirect(result.url);
    }

  });

});

module.exports = router;
