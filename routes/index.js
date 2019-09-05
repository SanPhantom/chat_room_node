var express = require('express');
var indexService = require('../services/indexService')
var tojson = require('../utils/result')
var crypto = require('crypto')
var TokenJWT = require('../utils/token')
var router = express.Router();

let buf = crypto.randomBytes(16);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res) {
    console.log(req.body)
    let pwd = req.body.password;
    // let SecrectKey = buf.toString('hex');
    // let Signture = crypto.createHmac('sha1', SecrectKey);
    // Signture.update(pwd);
    // var miwen = Signture.digest().toString('base64');
    // console.log('token ==> ' + SecrectKey);
    // console.log('加密前miwen ==> ' + req.body.password);
    // console.log('miwen ==> ' + miwen);
    try {
        let result = await indexService.phoneLogin(req.body.phone, req.body.password);
        // delete result.password;
        // res.cookie('user', MD5);
        let jwt = new TokenJWT(result.id.toString());
        let token = jwt.generateToken();
        let res_value = tojson.format(200, result, token);
        res.json(res_value);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/register', function(req, res) {

})

module.exports = router;