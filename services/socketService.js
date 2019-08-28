var socket = require('nodejs-websocket');

var server = socket.createServer(function(conn) {
    conn.on('text', function(str) {

    });
    conn.on('close', function(code, reason) {
        console.log('service is closed');
    });
    conn.on('error', function(code, reason) {
        console.log("service is closed for error");
    });
}).listen(8001);