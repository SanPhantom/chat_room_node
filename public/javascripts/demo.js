let socket = io.connect('ws://127.0.0.1:3000', { path: '/chat/socket.io' });


//发送消息
socket.on('send', function(data) {
    console.log(data);
})


function a() {
    socket.emit('join', {
        id: '123456',
        name: 'nihao',
        phone: '15972167940'
    });

    socket.emit('sendToOne', {
        to: '123478',
        msg: '你好， 你是谁',
        from: '123456',
        type: 'private'
    });
}

var option = {
    type: "POST",
    url: "/login",
    dataType: "json",
    data: {
        phone: '15972167940'
    },
    success: function(response) {
        console.log(response);
    },
    error: function(err) {
        alert(err);
    }
}
$.ajax(option);