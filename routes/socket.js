var express = require('express');
var expressWs = require("express-ws");
var app = express();
var router = express.Router();

class WSRouter {
    constructor(server) {
        this.count = 0;
        this.wss = [];
        this.server = server;
        return this.exec();
    }

    exec() {
        expressWs(app, this.server);
        let _this = this;
        router.ws('/:userid', function(ws, req) {
            _this.wss.push(ws);
            console.log(ws);
            _this.count++;
            ws.send('当前人数：' + _this.count);
            // ws.send('请求连接……')
            // ws.send('该好友已上线，有事说事，没事请远离' + req.params.userid);
            ws.send("123");
            ws.on('message', function(msg) {
                console.log(msg);
                console.log(_this.wss);
                ws.send(_this.wss);
                _this.wss = _this.wss.filter(function(element, index, array) {
                    return array.indexOf(element) === index;
                });
                if (ws.readyState != ws.OPEN) {
                    console.log("client status ===> " + ws.readyState);
                    return;
                } else {
                    console.log("client status ===> " + ws.readyState);
                    console.log("ws ==>" + _this.wss.length);
                    _this.wss.forEach(x => {
                        // console.log(x);
                        x.send(msg);
                    })
                }

                // ws.send(msg)
            });
            ws.on("close", function(err, reason) {
                // _this.wss.filter(x => x !== ws);
                ws.close();
                // console.log(err);
            });
            ws.on("error", function(err, reason) {
                _this.wss.filter(x => x !== ws);
                console.log(err);
            });
        })
        app.use('/chat', router);
    }
}


module.exports = WSRouter;