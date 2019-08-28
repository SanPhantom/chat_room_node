var express = require('express');
var userServie = require('../services/userService')
var tojson = require('../utils/result')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/show', async function(req, res, next) {
    res.cookie('tel', '15972167940');
    console.log(req.cookies);
    try {
        let result = await userServie.show();
        let res_value = tojson.format(200, result, req.cookies);
        console.log("result ==> " + res_value);
        res.json(res_value);

    } catch (error) {
        res.send(error);
    }
})

module.exports = router;