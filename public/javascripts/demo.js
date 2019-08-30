window.onload = function() {
    let socket = null;

    function init() {

        socket = io.connect('http://127.0.0.1:3000/chat');

        //发送消息
        socket.emit('join', "Mike", function(data) {
            console.log(data);
        });

        // console.log(socket);

        // if (socket.readyState !== 1) {
        //     socket.addEventListener('open', socketOpen);

        //     socket.addEventListener('message', function(event) {
        //         console.log(event.data);
        //     });

        //     socket.addEventListener('close', function(event) {
        //         socket.close();
        //     });

        //     socket.addEventListener('error', function(event) {
        //         init();
        //     });
        // }
    }


    init();

    function socketOpen(event) {
        console.log(event);
        console.log('socket is open')
        socket.send('设施你的');
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
}