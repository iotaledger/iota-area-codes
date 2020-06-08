import SocketIOClient from "socket.io-client";

/**
 * Class to handle api communications.
 */
export class ApiClient {
    /**
     * The endpoint for performing communications.
     */
    private readonly _endpoint: string;

    /**
     * The web socket to communicate on.
     */
    private _socket?: SocketIOClient.Socket;

    /**
     * Called when receiving an IAC event from api.
     */
    private _iacCallback?: (iac: string, trytes: string) => void;

    /**
     * Create a new instance of ApiClient.
     * @param endpoint The endpoint for the api.
     * @param iacCallback Called when receiving an IAC event from api.
     */
    constructor(endpoint: string) {
        this._endpoint = endpoint;
    }

    /**
     * Subscribe to the ZMQ messages.
     * @param iacCallback Called when receiving an IAC event from api.
     */
    public subscribe(iacCallback: (iac: string, trytes: string) => void): void {
        this._socket = SocketIOClient(this._endpoint);

        this._iacCallback = iacCallback;

        this._socket.on("iac", (data: {
            /**
             * IAC.
             */
            iac: string;
            /**
             * Transaction Trytes.
             */
            trytes: string;
        }) => {
            iacCallback(data.iac, data.trytes);
        });
    }
}
