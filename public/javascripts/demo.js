let socket = io.connect('ws://127.0.0.1:3000', { path: '/chat/socket.io' });


//发送消息
socket.on('send', function(data) {
    console.log(data);
})


function a() {
    socket.emit('getter', 'nihao');
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