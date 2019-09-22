var express = require('express');
var indexService = require('../services/indexService')
var tojson = require('../utils/result')
var crypto = require('crypto')
var TokenJWT = require('../utils/token')
var router = express.Router();
var User = require('../modal/User')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', async function (req, res) {
    console.log(req.body)
    let pwd = req.body.password;
    try {
        let result = await indexService.phoneLogin(req.body.phone, req.body.password);
        if (result.constructor === Object) {
            let jwt = new TokenJWT(result.id.toString());
            let token = jwt.generateToken();
            let res_value = tojson.format(200, result, token);
            res.json(res_value);
        } else {
            res.json({code: 400, message: result});
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/register', function (req, res) {
    try {
        let user = new User();
        user.init(req.body);
        
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;