
export interface ConversionState {
    /**
     * The user entered iota area code.
     */
    userIotaAreaCode: string;

    /**
     * The user entered open iota area is valid.
     */
    userIotaAreaCodeIsValid?: boolean;

    /**
     * The user entered open location code.
     */
    userOpenLocationCode: string;

    /**
     * The user entered open location code is valid.
     */
    userOpenLocationCodeIsValid?: boolean;

    /**
     * The latitude clicked on the map.
     */
    latitude?: number;

    /**
     * The longitude clicked on the map.
     */
    longitude?: number;

    /**
     * The iota area code.
     */
    iotaAreaCode?: string;

    /**
     * The iota area code precision.
     */
    codePrecision?: number;

    /**
     * The clicked lontitude.
     */
    clickedLng?: number;

    /**
     * The clicked latitude.
     */
    clickedLat?: number;

    /**
     * The open location code.
     */
    openLocationCode?: string;

    /**
     * The dimensions in degrees.
     */
    degrees?: string;

    /**
     * The dimensions in metres.
     */
    metres?: string;

    /**
     * The default zoom.
     */
    zoom?: number;
}
