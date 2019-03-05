"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var iota_area_codes_1 = require("iota-area-codes");
var zeromq_1 = __importDefault(require("zeromq"));
/**
 * Class to handle zmq communication.
 */
var Zmq = /** @class */ (function () {
    function Zmq() {
    }
    /**
     * Initialise the zmq.
     * @param zmqEndpoint The endpoint to connect to.
     * @param callback The callback used when matching iac transaction.
     */
    Zmq.prototype.initialise = function (zmqEndpoint, callback) {
        var _this = this;
        this._callback = callback;
        this._zmqSocket = zeromq_1.default.socket("sub");
        this._zmqSocket.connect(zmqEndpoint);
        this._zmqSocket.on("message", function (msg) { return _this.handleZmqMessage(msg); });
        this._zmqSocket.subscribe("tx_trytes");
    };
    /**
     * Handle a message from zmq.
     * @param message The message to process.
     */
    Zmq.prototype.handleZmqMessage = function (message) {
        var data = message.toString().split(" ");
        var trytes = data[1];
        var tag = trytes.slice(2592, 2619);
        var iac = iota_area_codes_1.extract(tag);
        if (iac) {
            this._callback(iac, trytes);
        }
    };
    return Zmq;
}());
exports.Zmq = Zmq;
