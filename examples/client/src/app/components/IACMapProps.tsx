export interface IACMapProps {
    /**
     * The Relevant Transactions.
     */
    transactions: {
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
