import { extract } from "@iota/area-codes";
import zmq from "zeromq";

/**
 * Class to handle zmq communication.
 */
export class Zmq {
    /**
     * The socket used for zmq communications.
     */
    private _zmqSocket: zmq.Socket;

    /**
     * Callback used when discovering IAC transactions.
     */
    private _callback: (iac: string, trytes: string) => void;

    /**
     * Initialise the zmq.
     * @param zmqEndpoint The endpoint to connect to.
     * @param callback The callback used when matching iac transaction.
     */
    public initialise(zmqEndpoint: string, callback: (iac: string, trytes: string) => void): void {
        this._callback = callback;

        this._zmqSocket = zmq.socket("sub");
        this._zmqSocket.connect(zmqEndpoint);

        this._zmqSocket.on("message", (msg) => this.handleZmqMessage(msg));

        this._zmqSocket.subscribe("tx_trytes");
    }

    /**
     * Handle a message from zmq.
     * @param message The message to process.
     */
    public handleZmqMessage(message: Buffer): void {
        const data = message.toString().split(" ");
        const trytes = data[1];
        const tag = trytes.slice(2592, 2619);

        const iac = extract(tag);

        if (iac) {
            this._callback(iac, trytes);
        }
    }
}
