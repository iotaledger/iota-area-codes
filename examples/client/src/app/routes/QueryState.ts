import { Transaction } from "@iota/core/typings/types";

export interface QueryState {
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
     * The user entered iota area code.
     */
    userIotaAreaCode: string;

    /**
     * The user entered open iota area is valid.
     */
    userIotaAreaCodeIsValid?: boolean;

    /**
     * IAC Transactions from the ZMQ Server.
     */
    iacTransactions?: {
        /**
         * The IOTA Area Code for the transaction.
         */
        iac: string;
        /**
         * The transaction object.
         */
        tx_id: string;
    }[];
}
