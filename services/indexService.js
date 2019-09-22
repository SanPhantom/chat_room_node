var db = require('../utils/mysql')

let phoneLogin = (phone, password) => {
    return new Promise((resolve, reject) => {
        // console.log(password);
        let sql = 'select * from user where phone = ' + phone;
        db.query(sql, function(err, rows) {
            if (err) {
                reject(err);
            } else {
                if (rows.length === 1) {
                    if (password === rows[0].password) {
                        resolve(rows[0]);
                    } else {
                        resolve('账号密码不匹配');
                    }
                } else {
                    resolve('账号不存在')
                }
            }
            // resolve(rows[0]);
        })
    })
}

module.exports = {
    phoneLogin
}