import express, { Application } from "express";
import { Server } from "http";
import SocketIO from "socket.io";
import { Zmq } from "./zmq";

const port = process.env.PORT || 4000;

const configId = process.env.CONFIG_ID || "local";
// tslint:disable:no-var-requires no-require-imports non-literal-require
const config = require(`./data/config.${configId}.json`);

const zmq = new Zmq();
const connectedSockets = [];

const app: Application = express();
const server = new Server(app);

const socketServer = SocketIO(server);

server.listen(port, () => {
    console.log(`API Started on port ${port}`);

    zmq.initialise(config.zmq.endpoint, handleIacTransaction);
});

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ name: "IOTA Area Codes API" }));
});

/**
 * Listen for incoming connections on the websocket.
 */
socketServer.on("connection", (socket) => {
    console.log("Socket connected");
    connectedSockets.push(socket);
    socket.on("disconnect", () => {
        const idx = connectedSockets.indexOf(socket);
        if (idx >= 0) {
            console.log("Socket disconnected");
            connectedSockets.splice(idx, 1);
        }
    });
});

/**
 * Handle an IAC transaction from the zmq channel.
 * @param iac The IOTA Area Code.
 * @param trytes The trytes for the transaction.
 */
function handleIacTransaction(iac: string, trytes: string): void {
    console.log("IAC Transaction", iac);

    for (let i = 0; i < connectedSockets.length; i++) {
        connectedSockets[i].emit("iac", { iac, trytes });
    }
}
