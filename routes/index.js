var express = require('express');
var indexService = require('../services/indexService')
var tojson = require('../utils/result')
var crypto = require('crypto')
var TokenJWT = require('../utils/token')
var router = express.Router();
var User = require('../modal/User')
var uuid = require('uuid/v1')
var baseData = require('../modal/base')
var multiparty = require('connect-multiparty')
var multer = require('multer')
var OSS = require('ali-oss')
var co = require('co')

const client = new OSS({
    accessKeyId: baseData.accessKeyId,
    accessKeySecret: baseData.accessKeySecret,
    region: 'oss-cn-shenzhen',
    bucket: baseData.bucket,
})

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', async function(req, res) {
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
            res.json({ code: 400, message: result });
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post('/register', async function(req, res) {
    let user = new User();
    user.init(req.body);

    user.id = uuid().replace(/\-/g, '');
    try {
        let result = await indexService.register(user);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.post('/upload/img', upload.single('potos'), function(req, res) {
    console.log(req.body, req.file);
    res.send(req.file);
})

module.exports = router;