/**
 * The area defined by an IOTA Area Code.
 */
export declare interface IacDimensions {
    /**
     * The blocks size of the area code in degrees.
     */
    blocksSizeDegrees?: number;

    /**
     * The blocks size of the area code in degrees formatted.
     */
    blocksSizeDegreesFormatted?: string;

    /**
     * The dimensions of the area in metres.
     */
    sizeMetres: number;

    /**
     * The dimensions of the area in a formatted.
     */
    sizeMetresFormatted: string;
}
