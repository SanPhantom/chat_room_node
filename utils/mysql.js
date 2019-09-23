var mysql = require('mysql');

let pool = mysql.createPool({
    host: '39.108.87.5',
    user: 'ttc',
    password: 'ttc0223',
    // socketPath: '/var/run/mysqld/mysqld.sock',
    database: 'chat',
    port: '3306'
})

function query(sql, callback) {
    pool.getConnection(function(err, conn) {
        conn.query(sql, function(err, rows, fields) {
            callback(err, rows);
            conn.release();
        });
    })

}

function query(sql, param, callback) {
    pool.getConnection(function(err, conn) {
        conn.query(sql, param, function(err, rows, fields) {
            callback(err, rows);
            conn.release();
        });
    })
}

module.exports = {
    query
};