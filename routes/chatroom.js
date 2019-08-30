var express = require('express');
var socketio = require('socket.io');
var io;
var guest_num = 0;

exports.listen = function(server) {
    io = socketio(server, {
        path: '/chat'
    });

    io.on('connection', function(socket) {
        var addedUser = false;

        socket.on('join', function(username) {
            if (addedUser) return;

            socket.username = username;
            ++guest_num;
            addedUser = true;

            socket.emit('login', {
                username: socket.username,
                num_user: guest_num
            })

            socket.broadcast.emit('join', {
                username: socket.username,
                msg: "欢迎 " + socket.username + " 进入聊天室",
                type: "BROADCAST",
                numUsers: guest_num
            })
        })
    })
}