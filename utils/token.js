var jwt = require('jsonwebtoken')
var fs = require('fs')
var path = require('path')
var crypto = require('crypto')

class Jwt {
    constructor(data) {
        this.data = data;
        this._id = null;
        this._date = null;
        this._createDate = null;
    }

    generateToken(data) {
        let x = data;
        if (x) {
            this.data = x;
        } else {
            data = this.data;
        }
        let created = Math.floor(Date.now() / 1000);
        let cert = fs.readFileSync(path.join(__dirname, '../public/key/private_key.pem'));
        let token = jwt.sign({
            data,
            exp: created + 60 * 30
        }, cert, { algorithm: 'RS256' });
        return token;
    }

    verifyToken() {
        let token = this.data;
        let cert = fs.readFileSync(path.join(__dirname, '../public/key/public_key.pem'));
        let res = null;
        try {
            let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
            let { exp = 0 } = result;
            let current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || [];
            }
        } catch (error) {
            res = 'error';
        }
        return res;
    }
}

module.exports = Jwt;