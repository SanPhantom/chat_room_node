window.onload = function() {
    var socket = new WebSocket("ws://" + document.location.host + "/chat");

    socket.addEventListener('open', function(event) {
        console.log(event);
        console.log('socket is open')
        socket.send('设施你的');
    });

    socket.addEventListener('message', function(event) {
        console.log('Message from server', event.data);
    });
}