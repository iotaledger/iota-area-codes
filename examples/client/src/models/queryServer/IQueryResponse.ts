import { IResponse } from "./IResponse";

export interface IQueryResponse extends IResponse {
    /**
     * The rows of data.
     */
    items?: {
        /**
         * The IOTA Area Code of the transaction.
         */
        iac: string;
        /**
         * The id of the transaction.
         */
        tx_id: string;
    }[];
}
