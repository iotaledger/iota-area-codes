/**
 * The area defined by an IOTA Area Code.
 */
export declare interface IacCodeArea {
    /**
     * The latitude of the center in degrees.
     */
    latitude: number;

    /**
     * The longitude of the center in degrees.
     */
    longitude: number;

    /**
     * The code precision.
     */
    codePrecision: number;

    /**
     * The low latitude.
     */
    latitudeLow: number;

    /**
     * The high latitude.
     */
    latitudeHigh: number;

    /**
     * The low longitude.
     */
    longitudeLow: number;

    /**
     * The high longitude.
     */
    longitudeHigh: number;
}
