export interface IACMapProps {
    /**
     * The Relevant Transactions.
     */
    iacTransactions: {
        /**
         * The IOTA Area Code for the transaction.
         */
        iac: string;
        /**
         * The transaction object.
         */
        tx_id: string;
    }[];

    /**
     * The Query.
     */
    query: string;
}
