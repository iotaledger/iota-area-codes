import axios from "axios";
import { IQueryRequest } from "../models/queryServer/IQueryRequest";
import { IQueryResponse } from "../models/queryServer/IQueryResponse";

/**
 * Class to handle query server communications.
 */
export class QueryClient {
    /**
     * The endpoint for performing communications.
     */
    private readonly _endpoint: string;

    /**
     * Create a new instance of QueryClient.
     * @param endpoint The endpoint for the api.
     */
    constructor(endpoint: string) {
        this._endpoint = endpoint;
    }

    /**
     * Perform a query on the db.
     * @param request The request to send.
     * @returns The response from the request.
     */
    public async query(request: IQueryRequest): Promise<IQueryResponse> {
        const ax = axios.create({ baseURL: this._endpoint });
        let response: IQueryResponse;

        try {
            const axiosResponse = await ax.post<IQueryResponse>(`query`, request);

            response = axiosResponse.data;
        } catch (err) {
            response = {
                success: false,
                message: `There was a problem communicating with the API.\n${err}`
            };
        }

        return response;
    }
}
