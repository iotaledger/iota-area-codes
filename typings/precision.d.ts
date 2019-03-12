import { IacCodeArea } from "./iacCodeArea";
import { IacDimensions } from "./IacDimensions";
/**
 * All the available precisions.
 */
export declare const PRECISIONS: number[];
/**
 * Decrease the precision of an area code.
 * @param iotaAreaCode The IOTA Area Code to decrease the precision.
 * @returns The decreased precision area code.
 */
export declare function decreasePrecision(iotaAreaCode: string): string;
/**
 * Increase the precision of an area code.
 * @param iotaAreaCode The IOTA Area Code to increase the precision.
 * @returns The increased precision area code.
 */
export declare function increasePrecision(iotaAreaCode: string): string;
/**
 * Set the precision of an area code.
 * @param iotaAreaCode The IOTA Area Code to set the precision.
 * @param codePrecision The new precision to set.
 * @returns The updated precision area code.
 */
export declare function setPrecision(iotaAreaCode: string, codePrecision: number): string;
/**
 * Set the precision of an area code.
 * @private
 * @param iotaAreaCode The IOTA Area Code to set the precision.
 * @param codePrecision The new precision to set.
 * @param decoded The decoded area code.
 * @returns The updated precision area code.
 */
export declare function internalSetPrecision(iotaAreaCode: string, codePrecision: number, decoded: IacCodeArea): string;
/**
 * Get the display dimensions for a area code precision.
 * @param codePrecision The precision of an area code.
 * @returns The display dimensions for the code precision.
 */
export declare function getPrecisionDimensions(codePrecision: number): IacDimensions;
