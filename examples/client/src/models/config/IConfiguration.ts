import { INodeConfiguration } from "./INodeConfiguration";
import { ITangleExplorerConfiguration } from "./ITangleExplorerConfiguration";

export interface IConfiguration {
    /**
     * The provider for an IRI node.
     */
    node: INodeConfiguration;

    /**
     * The api endpoint for the IOTA Area Codes.
     */
    apiEndpoint: string;

    /**
     * The query endpoint for the IOTA Area Codes.
     */
    queryEndpoint: string;

    /**
     * The tangle explorer configuration.
     */
    tangleExplorer: ITangleExplorerConfiguration;

    /**
     * The google analytics id.
     */
    googleAnalyticsId: string;

    /**
     * The google maps key.
     */
    googleMapsKey: string;

    /**
     * The seed to use for address creation.
     */
    seed: string;
}
