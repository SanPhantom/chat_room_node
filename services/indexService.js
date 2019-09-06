var db = require('../utils/mysql')

let phoneLogin = (phone, password) => {
    return new Promise((resolve, reject) => {
        // console.log(password);
        let sql = 'select * from user where phone = ' + phone + " and password = " + password;
        db.query(sql, function(err, rows) {
            if (err) {
                reject(err);
            } else {
                if (rows) {
                    if (password === rows[0].password) {

                    }
                } else {
                    resolve('账号不存在')
                }
            }
            resolve(rows[0]);
        })
    })
}

module.exports = {
    phoneLogin
}