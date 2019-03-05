"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = __importDefault(require("socket.io"));
var zmq_1 = require("./zmq");
var port = process.env.PORT || 4000;
var configId = process.env.CONFIG_ID || "local";
// tslint:disable:no-var-requires no-require-imports non-literal-require
var config = require("./data/config." + configId + ".json");
var zmq = new zmq_1.Zmq();
var connectedSockets = [];
var app = express_1.default();
var server = new http_1.Server(app);
var socketServer = socket_io_1.default(server);
server.listen(port, function () {
    console.log("API Started on port " + port);
    zmq.initialise(config.zmq.endpoint, handleIacTransaction);
});
app.get("/", function (req, res) {
    res.send(JSON.stringify({ name: "IOTA Area Codes API" }));
});
/**
 * Listen for incoming connections on the websocket.
 */
socketServer.on("connection", function (socket) {
    connectedSockets.push(socket);
    socket.on("disconnect", function () {
        var idx = connectedSockets.indexOf(socket);
        if (idx >= 0) {
            connectedSockets.splice(idx, 1);
        }
    });
});
/**
 * Handle an IAC transaction from the zmq channel.
 * @param iac The IOTA Area Code.
 * @param trytes The trytes for the transaction.
 */
function handleIacTransaction(iac, trytes) {
    console.log("IAC Transaction", iac);
    for (var i = 0; i < connectedSockets.length; i++) {
        connectedSockets[i].emit("iac", { iac: iac, trytes: trytes });
    }
}
