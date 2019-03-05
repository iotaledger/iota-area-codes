
export interface ConversionFileState {
    /**
     * The user entered iota area code.
     */
    userIotaAreaCode?: string;

    /**
     * The user entered open iota area is valid.
     */
    userIotaAreaCodeIsValid?: boolean;

    /**
     * The user entered open location code.
     */
    userOpenLocationCode?: string;

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
     * The open location code.
     */
    openLocationCode?: string;

    /**
     * The default zoom.
     */
    zoom?: number;
}
