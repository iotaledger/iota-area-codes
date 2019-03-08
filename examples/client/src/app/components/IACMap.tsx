import * as IotaAreaCodes from "@iota/area-codes";
import GoogleMapReact from "google-map-react";
import React, { Component, ReactNode } from "react";
import markerBlue from "../../assets/marker-blue.png";
import { ServiceFactory } from "../../factories/serviceFactory";
import { IConfiguration } from "../../models/config/IConfiguration";
import { ConfigurationService } from "../../services/configurationService";
import "./IACMap.scss";
import IACMapMarker from "./IACMapMarker";
import { IACMapProps } from "./IACMapProps";
import { IACMapState } from "./IACMapState";

/**
 * Component to display an IAC transaction.
 */
class IACTransactionCard extends Component<IACMapProps, IACMapState> {
    /**
     * The configuration.
     */
    private readonly _configuration: IConfiguration;

    /**
     * The area code to display.
     */
    private _area: IotaAreaCodes.IacCodeArea;

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
     * Create a new instance of EventCard.
     * @param props The props.
     */
    constructor(props: IACMapProps) {
        super(props);

        this._configuration = ServiceFactory.get<ConfigurationService<IConfiguration>>("configuration").get();

        this._area = IotaAreaCodes.decode(this.props.query);

        this.state = {
            zoom: this.zoom(this._area.codePrecision),
            center: { lat: this._area.latitude, lng: this._area.longitude }
        };
    }

    /**
     * The component received an update.
     * @param prevProps The previous props.
     */
    public componentDidUpdate(prevProps: IACMapProps): void {
        if (this.props.iacTransactions !== prevProps.iacTransactions) {
            this._area = IotaAreaCodes.decode(this.props.query);

            this.setState(
                {
                    zoom: this.zoom(this._area.codePrecision),
                    center: { lat: this._area.latitude, lng: this._area.longitude }
                },
                () => this.createHighlight());
        }
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <div className="iac-map--container">
                <div className="iac-map">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: this._configuration.googleMapsKey }}
                        center={this.state.center}
                        zoom={this.state.zoom}
                        onGoogleApiLoaded={e => this.apiLoaded(e.map, e.maps)}
                        yesIWantToUseGoogleMapApiInternals={true}
                    >
                        {this.props.iacTransactions && this.props.iacTransactions.map((tx, idx) => {
                            const location = IotaAreaCodes.decode(tx.iac);
                            return (
                                <IACMapMarker
                                    key={idx}
                                    transactionHash={tx.tx_id}
                                    lat={location.latitude}
                                    lng={location.longitude}
                                    icon={markerBlue}
                                />
                            );
                        })}
                    </GoogleMapReact>
                </div>
            </div>
        );
    }

    /**
     * Zoom the map based on the precision.
     * @param codePrecision The code precision to use for zooming.
     * @returns The zoom based on the precision.
     */
    private zoom(codePrecision: number): number {
        let zoom;
        switch (codePrecision) {
            case 2:
                zoom = 3;
                break;
            case 4:
                zoom = 7;
                break;
            default:
                zoom = 12;
        }
        return zoom;
    }

    /**
     * The google maps api was loaded capture the maps and map object.
     * @param map The map object.
     * @param maps The maps object.
     */
    private apiLoaded(map: any, maps: any): void {
        this._map = map;
        this._maps = maps;

        this.createHighlight();
    }

    /**
     * Create the highlight for the area.
     */
    private createHighlight(): void {
        if (this._highlight) {
            this._highlight.setMap(undefined);
        }
        this._highlight = new this._maps.Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.1,
            bounds: {
                south: this._area.latitudeLow,
                north: this._area.latitudeHigh,
                west: this._area.longitudeLow,
                east: this._area.longitudeHigh
            }
        });
        this._highlight.setMap(this._map);
    }
}

export default IACTransactionCard;
