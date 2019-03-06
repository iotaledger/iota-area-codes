import { IacCodeArea } from "./iacCodeArea";
/**
 * Encode a location into an IOTA Area Code.
 * @param latitude The latitude in signed decimal degrees. Values less than -90 will be clipped to -90, values over 90 will be clipped to 90.
 * @param longitude The longitude in signed decimal degrees. This will be normalised to the range -180 to 180.
 * @param precision The desired code length. If omitted, CodePrecision.NORMAL will be used. For precision CodePrecision.EXTRA is recommended.
 * @returns The IOTA Area Code for the location.
 */
export declare function encode(latitude: number, longitude: number, precision?: number): string;
/**
 * Decode an IOTA Area Code into a location.
 * @param iotaAreaCode The IOTA Area Code to convert.
 * @returns The location object.
 */
export declare function decode(iotaAreaCode: string): IacCodeArea;
/**
 * Convert the Open Location Code to IOTA Area Code.
 * @param openLocationCode The Open Location Code to convert.
 * @returns The IOTA Area Code.
 */
export declare function fromOpenLocationCode(openLocationCode: string): string;
/**
 * Convert the IOTA Area Code to Open Location Code.
 * @param iotaAreaCode The IOTA Area Code to convert.
 * @returns The Open Location Code.
 */
export declare function toOpenLocationCode(iotaAreaCode: string): string;
