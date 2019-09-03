var socketio = {};
var hashName = new Object();
var users = new Array();
var socket_io = require('socket.io');

socketio.getSocketIO = function(server) {
    var io = socket_io.listen(server, {
        path: '/chat'
    });

    io.on('connection', function(socket) {

        socket.emit('send', '连接中……');

        socket.on('join', function(user) {
            socket.id = user.id;
            if (!(user.id in hashName)) {
                hashName[user.id] = socket;
            }
            socket.broadcast.emit('send', '欢迎' + user.name + '归来');

        })

        socket.on('sendToOne', function(msg) {
            let id = msg.to;
            hashName[id].emit('sendMsg', { msg: msg });
        })

        socket.on('discount', function(user) {
            let id = user.id;
            // hashName[id].emit('sendMsg', { msg: msg });
            if (socket.id in hashName) {
                delete(hashName[user.id]);
                users.splice(user.indexOf(user.id), 1);
            }
            console.log(users);
            socket.broadcast.emit('send', '恭送' + user.name);
        })
    })
}

module.exports = socketio;