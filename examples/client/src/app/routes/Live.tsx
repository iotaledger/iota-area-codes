import * as IotaAreaCodes from "@iota/area-codes";
import { asTransactionObject } from "@iota/transaction-converter";
import GoogleMapReact from "google-map-react";
import { Button, Heading } from "iota-react-components";
import React, { Component, ReactNode } from "react";
import markerBlue from "../../assets/marker-blue.png";
import { ServiceFactory } from "../../factories/serviceFactory";
import { IConfiguration } from "../../models/config/IConfiguration";
import { ApiClient } from "../../services/apiClient";
import { ConfigurationService } from "../../services/configurationService";
import { TangleExplorerService } from "../../services/tangleExplorerService";
import IACMapMarker from "../components/IACMapMarker";
import { LiveState } from "./LiveState";

/**
 * Component which will show use of zmq api on a live map.
 */
class Live extends Component<any, LiveState> {
    /**
     * The configuration.
     */
    private readonly _configuration: IConfiguration;

    /**
     * The api client.
     */
    private readonly _apiClient: ApiClient;

    /**
     * The tangle explorer service.
     */
    private readonly _tangleExplorerService: TangleExplorerService;

    /**
     * The map object.
     */
    private _map: any;

    /**
     * The maps object.
     */
    private _maps: any;

    /**
     * Map highlight polygon.
     */
    private readonly _highlight: any;

    /**
     * Create a new instance of Live.
     * @param props The props.
     */
    constructor(props: any) {
        super(props);

        this._configuration = ServiceFactory.get<ConfigurationService<IConfiguration>>("configuration").get();
        this._apiClient = new ApiClient(this._configuration.apiEndpoint, (iac, trytes) => this.handleTransaction(iac, trytes));
        this._tangleExplorerService = ServiceFactory.get<TangleExplorerService>("tangleExplorer");

        this.state = {
            iacTransactions: [],
            zoom: 1,
            center: {
                lat: 52.529562,
                lng: 13.413047
            }
        };
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <React.Fragment>
                <Heading level={1}>Live Map</Heading>
                <p>As IAC transactions arrive on the ZMQ feed the map will update.</p>
                <div className="map-container">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: this._configuration.googleMapsKey }}
                        zoom={this.state.zoom}
                        center={this.state.center}
                        onChange={(e) => this.setState({ zoom: e.zoom, center: e.center })}
                        onGoogleApiLoaded={(e) => this.apiLoaded(e.map, e.maps)}
                        yesIWantToUseGoogleMapApiInternals={true}
                    >
                        {this.state.iacTransactions && this.state.iacTransactions.map((tx, idx) => {
                            const location = IotaAreaCodes.decode(tx.iac);
                            return (
                                <IACMapMarker
                                    key={idx}
                                    transactionHash={tx.transactionHash}
                                    lat={location.latitude}
                                    lng={location.longitude}
                                    icon={markerBlue}
                                />
                            );
                        })}
                    </GoogleMapReact>
                </div>
                <Button
                    onClick={() => this.setState({
                        zoom: 0,
                        center: {
                            lat: 52.529562,
                            lng: 13.413047
                        },
                        iacTransactions: []
                    })}
                >
                    Reset Map
                </Button>
                <hr />
                <p>For further information on how this code is implemeted visit the GitHub Repository for
                    the main library [<a href="https://github.com/iotaledger/iota-area-codes" target="_blank" rel="noreferrer noopener">@iota/area-codes</a>]
                    , the web app [<a href="https://github.com/iotaledger/iota-area-codes/tree/master/examples/client" target="_blank" rel="noreferrer noopener">Client</a>]
                    or the ZMQ api [<a href="https://github.com/iotaledger/iota-area-codes/tree/master/examples/api" target="_blank" rel="noreferrer noopener">ZMQ API</a>]
                </p>
            </React.Fragment>
        );
    }

    /**
     * The google maps api was loaded capture the maps and map object.
     * @param map The map object.
     * @param maps The maps object.
     */
    private apiLoaded(map: any, maps: any): void {
        this._map = map;
        this._maps = maps;
    }

    /**
     * Handle an IAC transaction from the zmq feed.
     * @param iac The IOTA Area Code.
     * @param trytes The trytes for the transaction.
     */
    private handleTransaction(iac: string, trytes: string): void {
        this.state.iacTransactions.unshift({ iac, transactionHash: asTransactionObject(trytes).hash });

        const area = IotaAreaCodes.decode(iac);

        let zoom = this.state.zoom;
        let zoomDir = -2;

        const doZoom = () => {
            zoom += zoomDir;
            this.setState(
                {
                    zoom
                },
                () => {
                    if (zoom <= 0) {
                        zoomDir = 2;
                        this.setState({
                            center: {
                                lat: area.latitude,
                                lng: area.longitude
                            }
                        });
                        setTimeout(doZoom, 250);
                    } else if (zoom >= area.codePrecision) {
                        // No timer required, we have finished
                    } else {
                        setTimeout(doZoom, 250);
                    }
                });
        };

        doZoom();
    }
}

export default Live;
