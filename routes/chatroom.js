var socketio = {};
var socket_io = require('socket.io');

socketio.getSocketIO = function(server) {
    var io = socket_io.listen(server, {
        path: '/chat'
    });

    io.sockets.on('connection', function(socket) {

        socket.emit('send', '连接中……');
        console.log('连接成功');
        socket.on('getter', function(msg) {
            console.log('监听点击事件' + msg);
            var datas = [1, 2, 3, 4, 5];
            socket.emit('send', { datas: datas });
            socket.broadcast.emit('send', { datas: datas });
        })
    })
}

module.exports = socketio;