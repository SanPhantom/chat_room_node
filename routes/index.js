var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res) {
    console.log(req.body.phone);
    res.send(req.body);
}).get('/login', function(req, res) {
    console.log(req.query);
    res.send(req.query);
})

router.post('/register', function(req, res) {

})

module.exports = router;