import { Transaction } from "@iota/core/typings/types";

export interface CreateState {
    /**
     * Is the form busy.
     */
    isBusy: boolean;

    /**
     * Has the request errored.
     */
    isErrored: boolean;

    /**
     * Status message to display.
     */
    status: string;

    /**
     * The IAC for the transaction.
     */
    iotaAreaCode: string;

    /**
     * Add a transaction message.
     */
    txMessage: string;

    /**
     * Transaction hash.
     */
    transactionHash?: string;

    /**
     * IAC Transactions from the ZMQ Server.
     */
    iacTransactions: {
        /**
         * The IOTA Area Code for the transaction.
         */
        iac: string;
        /**
         * The transaction object.
         */
        transaction: Transaction;
    }[];
}
