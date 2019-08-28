var express = require('express');
var expressWs = require("express-ws");
var app = express();
var router = express.Router();

class WSRouter {
    constructor(server) {
        this.server = server;
        return this.exec();
    }

    exec() {
        expressWs(app, this.server);
        router.ws('/', function(ws, req) {
            ws.send('请求连接……')
            ws.send('You have connected successfully');
            ws.on('message', function(msg) {
                console.log(msg);
                ws.send(msg)
            });
            ws.on("close", function(err, reason) {
                console.log(err);
            });
            ws.on("error", function(err, reason) {
                console.log(err);
            });
        })
        app.use('/chat', router);
    }
}


module.exports = WSRouter;