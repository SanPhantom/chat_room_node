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

let register = (user) => {
    user.cid = "123";

    let sql_insert = 'insert into c_user(id, nickname, phone, password, email, cid, avatar) values (?, ?, ?, ?, ?, ?, ?)';

    let params = [user.id, user.nickname, user.phone, user.password, user.email, user.cid, user.avatar];
    return new Promise((resolve, reject) => {
        // console.log(user);
        db.query(sql_insert, params, function(err, rows) {
            if (err) {
                reject(err);
            } else {
                if (rows.affectedRows === 1) {
                    resolve({ code: 200, message: '注册成功' });
                } else {
                    resolve({ code: 502, message: '注册失败' })
                }

            }
        })
    })
}

module.exports = {
    phoneLogin,
    register
}