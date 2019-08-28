var db = require('../utils/mysql');

let show = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from user', function(err, rows) {
            if (err) {
                reject(err);
            }
            resolve(rows);
        })
    })
}

module.exports = {
    show
}