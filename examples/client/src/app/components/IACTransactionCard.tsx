import classnames from "classnames";
import GoogleMapReact from "google-map-react";
import * as IotaAreaCodes from "iota-area-codes";
import { Button } from "iota-react-components";
import React, { Component, ReactNode } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import { TrytesHelper } from "../../helpers/trytesHelper";
import { IConfiguration } from "../../models/config/IConfiguration";
import { ConfigurationService } from "../../services/configurationService";
import { TangleExplorerService } from "../../services/tangleExplorerService";
import "./IACTransactionCard.scss";
import { IACTransactionCardProps } from "./IACTransactionCardProps";
import { IACTransactionCardState } from "./IACTransactionCardState";

/**
 * Component to display an IAC transaction.
 */
class IACTransactionCard extends Component<IACTransactionCardProps, IACTransactionCardState> {
    /**
     * The configuration.
     */
    private readonly _configuration: IConfiguration;

    /**
     * The tangle explorer service.
     */
    private readonly _tangleExplorerService: TangleExplorerService;

    /**
     * The area.
     */
    private readonly _area: IotaAreaCodes.IacCodeArea;

    /**
     * Create a new instance of EventCard.
     * @param props The props.
     */
    constructor(props: IACTransactionCardProps) {
        super(props);

        this._configuration = ServiceFactory.get<ConfigurationService<IConfiguration>>("configuration").get();
        this._tangleExplorerService = ServiceFactory.get<TangleExplorerService>("tangleExplorer");

        let payloadMessage = "";
        if (this.props.transaction) {
            // tslint:disable-next-line:completed-docs
            const payload = TrytesHelper.fromTrytes<{ message: string }>(this.props.transaction.signatureMessageFragment);
            payloadMessage = payload.message;
        }

        this._area = IotaAreaCodes.decode(this.props.iotaAreaCode);

        this.state = {
            showMap: false,
            message: payloadMessage
        };
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <div className="iac-transaction-card">
                <div className="iac-transaction--iac">
                    {this.props.iotaAreaCode}
                </div>
                <div className="iac-transaction--message">
                    {this.state.message}
                </div>
                <div className="iac-transaction--actions">
                    <Button long={true} onClick={() => this._tangleExplorerService.transaction(this.props.transactionHash)}>{this.props.transactionHash}</Button>
                </div>
                <div className="iac-transaction--map-container">
                    <a
                        className="iac-transaction--map-toggle icon-up-down"
                        onClick={() => this.setState({ showMap: !this.state.showMap })}
                        role="button"
                    >{this.state.showMap ? "Hide Map" : "Show Map"}&nbsp;
                    </a>

                    <div
                        className={classnames(
                            "iac-transaction--map",
                            { "iac-transaction--map__hidden": !this.state.showMap }
                        )}
                    >
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: this._configuration.googleMapsKey }}
                            defaultCenter={{
                                lat: this._area.latitude,
                                lng: this._area.longitude
                            }}
                            defaultZoom={19}
                            onGoogleApiLoaded={(e) => this.apiLoaded(e.map, e.maps)}
                            yesIWantToUseGoogleMapApiInternals={true}
                        />
                    </div>
                </div>
            </div>);
    }

    /**
     * The google maps api was loaded capture the maps and map object.
     * @param map The map object.
     * @param maps The maps object.
     */
    private apiLoaded(map: any, maps: any): void {
        const react = new maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            bounds: {
                south: this._area.latitudeLow,
                north: this._area.latitudeHigh,
                west: this._area.longitudeLow,
                east: this._area.longitudeHigh
            }
        });

        react.setMap(map);
    }
}

export default IACTransactionCard;
