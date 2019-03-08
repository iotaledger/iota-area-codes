export interface LiveState {
    /**
     * The center for the map.
     */
    center: {
        /**
         * The latitude for the center.
         */
        lat: number;
        /**
         * The longitude for the center.
         */
        lng: number;
    };

    /**
     * The zoom for the map.
     */
    zoom: number;

    /**
     * IAC Transactions from the ZMQ Server.
     */
    iacTransactions: {
        /**
         * The IOTA Area Code for the transaction.
         */
        iac: string;
        /**
         * The transaction hash.
         */
        transactionHash: string;
    }[];
}
