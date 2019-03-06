import { composeAPI, generateAddress } from "@iota/core";
import { asTransactionObject } from "@iota/transaction-converter";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import * as IotaAreaCodes from "iota-area-codes";
import { Button, ButtonContainer, Fieldset, Form, FormActions, FormStatus, Heading } from "iota-react-components";
import React, { Component, ReactNode } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import { TrytesHelper } from "../../helpers/trytesHelper";
import { IConfiguration } from "../../models/config/IConfiguration";
import { ApiClient } from "../../services/apiClient";
import { ConfigurationService } from "../../services/configurationService";
import { TangleExplorerService } from "../../services/tangleExplorerService";
import IACTransactionCard from "../components/IACTransactionCard";
import { CreateState } from "./CreateState";

/**
 * Component which will show use of zmq api.
 */
class Create extends Component<any, CreateState> {
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
    private _highlight: any;

    /**
     * Create a new instance of Create.
     * @param props The props.
     */
    constructor(props: any) {
        super(props);

        this._configuration = ServiceFactory.get<ConfigurationService<IConfiguration>>("configuration").get();
        this._apiClient = new ApiClient(this._configuration.apiEndpoint, (iac, trytes) => this.handleTransaction(iac, trytes));
        this._tangleExplorerService = ServiceFactory.get<TangleExplorerService>("tangleExplorer");

        this.state = {
            isBusy: false,
            isErrored: false,
            status: "",
            iotaAreaCode: "",
            txMessage: "",
            iacTransactions: []
        };
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <React.Fragment>
                <Heading level={1}>Create IAC Transaction</Heading>
                <p>Select an area on the map and create a transaction tagged with that location.
                    Once the transaction is confirmed the server should identify it in the ZMQ feed and return it to the client.</p>
                <Form>
                    <div className="map-container">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: this._configuration.googleMapsKey }}
                            defaultCenter={{
                                lat: 52.529562,
                                lng: 13.413047
                            }}
                            defaultZoom={19}
                            onClick={(e) => this.mapClicked(e)}
                            onGoogleApiLoaded={(e) => this.apiLoaded(e.map, e.maps)}
                            yesIWantToUseGoogleMapApiInternals={true}
                        />
                    </div>
                    {this.state.iotaAreaCode && (
                        <Fieldset small={true}>
                            <label>IOTA Area Code</label>
                            <span>{this.state.iotaAreaCode}</span>
                        </Fieldset>
                    )}
                    <Fieldset>
                        <label>Message</label>
                        <input
                            type="text"
                            placeholder="Please enter a message to include in the transaction"
                            value={this.state.txMessage}
                            onChange={(e) => this.setState({ txMessage: e.target.value })}
                            readOnly={this.state.isBusy}
                        />
                    </Fieldset>
                    <FormActions>
                        <Button disabled={this.state.isBusy || !this.state.iotaAreaCode || !this.state.txMessage} onClick={async () => this.createTransaction()}>Create Transaction</Button>
                    </FormActions>
                    <FormStatus message={this.state.status} isBusy={this.state.isBusy} isError={this.state.isErrored} />
                    {this.state.transactionHash && (
                        <React.Fragment>
                            <p>You can view the transaction on the Tangle here, it should also appear in the Transactions list when confirmed and detected by the ZMQ Server.</p>
                            <ButtonContainer>
                                <Button color="secondary" long={true} onClick={() => this._tangleExplorerService.transaction(this.state.transactionHash)}>{this.state.transactionHash}</Button>
                            </ButtonContainer>
                        </React.Fragment>
                    )}
                    <hr />
                    <Heading level={1}>Transactions (ZMQ Feed from API)</Heading>
                    {this.state.iacTransactions.length === 0 && (
                        <p>There are currently no IAC transactions to show.</p>
                    )}
                    {this.state.iacTransactions.length > 0 && this.state.iacTransactions.map(item => (
                        <IACTransactionCard key={item.transaction.hash} iotaAreaCode={item.iac} transactionHash={item.transaction.hash} transaction={item.transaction} />
                    ))}

                </Form>
            </React.Fragment>
        );
    }

    /**
     * The map was clicked.
     * @param event The click event.
     */
    private async mapClicked(event: ClickEventValue): Promise<void> {
        const iac = IotaAreaCodes.encode(event.lat, event.lng);

        this.setState({ iotaAreaCode: iac });

        const area = IotaAreaCodes.decode(iac);

        this.updateHighlight(area);
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
     * Create a transaction on the tangle.
     */
    private async createTransaction(): Promise<void> {
        this.setState(
            {
                isBusy: true,
                isErrored: false,
                status: "Creating transaction, please wait...",
                transactionHash: ""
            },
            async () => {
                try {
                    const iota = composeAPI({
                        provider: this._configuration.node.provider
                    });

                    const nextAddress = generateAddress(this._configuration.seed, 0, 2);

                    const trytes = await iota.prepareTransfers(
                        "9".repeat(81),
                        [
                            {
                                address: nextAddress,
                                value: 0,
                                message: TrytesHelper.toTrytes({ message: this.state.txMessage }),
                                tag: this.state.iotaAreaCode
                            }
                        ]);

                    const bundle = await iota.sendTrytes(trytes, this._configuration.node.depth, this._configuration.node.mwm);

                    this.setState({
                        isBusy: false,
                        status: "",
                        isErrored: true,
                        transactionHash: bundle[0].hash
                    });
                } catch (err) {
                    this.setState({
                        isBusy: false,
                        status: err.message,
                        isErrored: true
                    });
                }
            });
    }

    /**
     * Update the highlight on the map.
     * @param area The area to highlight.
     */
    private updateHighlight(area: IotaAreaCodes.IacCodeArea): void {
        if (this._highlight) {
            this._highlight.setMap(undefined);
        }

        this._highlight = new this._maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: this._map,
            bounds: {
                south: area.latitudeLow,
                north: area.latitudeHigh,
                west: area.longitudeLow,
                east: area.longitudeHigh
            }
        });
    }

    /**
     * Handle an IAC transaction from the zmq feed.
     * @param iac The IOTA Area Code.
     * @param trytes The trytes for the transaction.
     */
    private handleTransaction(iac: string, trytes: string): void {
        this.state.iacTransactions.unshift({ iac, transaction: asTransactionObject(trytes) });
        this.setState({ iacTransactions: this.state.iacTransactions.slice(0, 10) });
    }
}

export default Create;
