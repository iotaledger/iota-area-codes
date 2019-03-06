import GoogleMapReact, { ClickEventValue } from "google-map-react";
import * as IotaAreaCodes from "iota-area-codes";
import { Button, Fieldset, Form, FormActions, Heading } from "iota-react-components";
import React, { Component, ReactNode } from "react";
import { ServiceFactory } from "../../factories/serviceFactory";
import { IConfiguration } from "../../models/config/IConfiguration";
import { ConfigurationService } from "../../services/configurationService";
import "./Conversion.scss";
import { ConversionState } from "./ConversionState";

/**
 * Component which will show conversions with IACs.
 */
class Conversion extends Component<any, ConversionState> {
    /**
     * The configuration.
     */
    private readonly _configuration: IConfiguration;

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
     * Create a new instance of Conversion.
     * @param props The props.
     */
    constructor(props: any) {
        super(props);

        this._configuration = ServiceFactory.get<ConfigurationService<IConfiguration>>("configuration").get();

        this.state = {
            userIotaAreaCode: "",
            userOpenLocationCode: ""
        };
    }

    /**
     * Render the component.
     * @returns The node to render.
     */
    public render(): ReactNode {
        return (
            <React.Fragment>
                <Heading level={1}>Map</Heading>
                <p>Click on the map to display the location details, or enter a location code</p>
                <Form>
                    <Fieldset>
                        <label>IOTA Area Code</label>
                        <input
                            type="text"
                            placeholder="Please enter the iota area code"
                            value={this.state.userIotaAreaCode}
                            onChange={(e) => this.setState({ userIotaAreaCode: e.target.value }, () => this.validateIotaAreaCode())}
                        />
                        <Button disabled={!this.state.userIotaAreaCodeIsValid} onClick={() => this.iotaAreaCode()}>Lookup</Button>
                    </Fieldset>
                    <Fieldset>
                        <label>Open Location Code</label>
                        <input
                            type="text"
                            placeholder="Please enter the open location code"
                            value={this.state.userOpenLocationCode}
                            onChange={(e) => this.setState({ userOpenLocationCode: e.target.value }, () => this.validateOpenLocationCode())}
                        />
                        <Button disabled={!this.state.userOpenLocationCodeIsValid} onClick={() => this.openLocationCode()}>Lookup</Button>
                    </Fieldset>
                    <div className="map-container">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: this._configuration.googleMapsKey }}
                            defaultCenter={{
                                lat: 52.529562,
                                lng: 13.413047
                            }}
                            center={{
                                lat: this.state.latitude || 52.529562,
                                lng: this.state.longitude || 13.413047
                            }}
                            defaultZoom={19}
                            zoom={this.state.zoom || 19}
                            onClick={(e) => this.mapClicked(e)}
                            onGoogleApiLoaded={(e) => this.apiLoaded(e.map, e.maps)}
                            yesIWantToUseGoogleMapApiInternals={true}
                            onChange={(e) => this.setState({ zoom: e.zoom })}
                        />
                    </div>
                    {this.state.latitude !== undefined && this.state.longitude !== undefined && (
                        <Fieldset small={true}>
                            <label>Latitude</label>
                            <span>{this.state.latitude}</span>
                            <label>Longitude</label>
                            <span>{this.state.longitude}</span>
                        </Fieldset>
                    )}
                    {this.state.iotaAreaCode !== undefined && this.state.openLocationCode !== undefined && (
                        <Fieldset small={true}>
                            <label>IOTA Area Code</label>
                            <span>{this.state.iotaAreaCode}</span>
                            <label>Open Location Code</label>
                            <span>{this.state.openLocationCode}</span>
                        </Fieldset>
                    )}
                    <FormActions>
                        <Button onClick={() => this.reset()}>Reset</Button>
                    </FormActions>
                </Form>
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
     * The map was clicked.
     * @param event The click event.
     */
    private mapClicked(event: ClickEventValue): void {
        this.updateIac(IotaAreaCodes.encode(event.lat, event.lng));
    }

    /**
     * Update based on iota area code.
     * @param iac The area code.
     */
    private updateIac(iac: string): void {
        const area = IotaAreaCodes.decode(iac);

        this.setState({
            latitude: area.latitude,
            longitude: area.longitude,
            iotaAreaCode: iac,
            openLocationCode: IotaAreaCodes.toOpenLocationCode(iac),
            zoom: area.codePrecision === 2 ? 1 : area.codePrecision * 2
        });

        this.updateHighlight(area);
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
     * Validate the iota area code using the library.
     */
    private validateIotaAreaCode(): void {
        let isValid = false;
        try {
            if (this.state.userIotaAreaCode) {
                isValid = IotaAreaCodes.isValid(this.state.userIotaAreaCode);
            }
        } catch (err) {
        }
        this.setState({ userIotaAreaCodeIsValid: isValid });
    }

    /**
     * Update the map based on the iota area code.
     */
    private iotaAreaCode(): void {
        if (this.state.userIotaAreaCode) {
            this.updateIac(this.state.userIotaAreaCode);
        }
    }

    /**
     * Validate the open location code using the library.
     */
    private validateOpenLocationCode(): void {
        let isValid = false;
        try {
            if (this.state.userOpenLocationCode) {
                IotaAreaCodes.fromOpenLocationCode(this.state.userOpenLocationCode);
                isValid = true;
            }
        } catch (err) {
        }
        this.setState({ userOpenLocationCodeIsValid: isValid });
    }

    /**
     * Update the map based on the open location code.
     */
    private openLocationCode(): void {
        if (this.state.userOpenLocationCode) {
            this.updateIac(IotaAreaCodes.fromOpenLocationCode(this.state.userOpenLocationCode));
        }
    }

    /**
     * Reset the map.
     */
    private reset(): void {
        this.setState({
            userIotaAreaCode: "",
            userIotaAreaCodeIsValid: undefined,
            userOpenLocationCode: "",
            userOpenLocationCodeIsValid: undefined,
            latitude: undefined,
            longitude: undefined,
            iotaAreaCode: undefined,
            openLocationCode: undefined,
            zoom: undefined
        });

        if (this._highlight) {
            this._highlight.setMap(undefined);
        }
    }
}

export default Conversion;
