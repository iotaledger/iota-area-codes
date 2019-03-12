import { decode, encode } from "./conversion";
import { IacCodeArea } from "./iacCodeArea";
import { IacDimensions } from "./IacDimensions";

/**
 * All the available precisions.
 */
export const PRECISIONS: number[] = [2, 4, 6, 8, 10, 11];

/**
 * Decrease the precision of an area code.
 * @param iotaAreaCode The IOTA Area Code to decrease the precision.
 * @returns The decreased precision area code.
 */
export function decreasePrecision(iotaAreaCode: string): string {
    const decoded = decode(iotaAreaCode);

    if (decoded.codePrecision <= PRECISIONS[0]) {
        throw new Error("The precision can not be decreased any more");
    }

    return internalSetPrecision(iotaAreaCode, PRECISIONS[PRECISIONS.indexOf(decoded.codePrecision) - 1], decoded);
}

/**
 * Increase the precision of an area code.
 * @param iotaAreaCode The IOTA Area Code to increase the precision.
 * @returns The increased precision area code.
 */
export function increasePrecision(iotaAreaCode: string): string {
    const decoded = decode(iotaAreaCode);

    if (decoded.codePrecision >= PRECISIONS[PRECISIONS.length - 1]) {
        throw new Error("The precision can not be increased any more");
    }

    return internalSetPrecision(iotaAreaCode, PRECISIONS[PRECISIONS.indexOf(decoded.codePrecision) + 1], decoded);
}

/**
 * Set the precision of an area code.
 * @param iotaAreaCode The IOTA Area Code to set the precision.
 * @param codePrecision The new precision to set.
 * @returns The updated precision area code.
 */
export function setPrecision(iotaAreaCode: string, codePrecision: number): string {
    const decoded = decode(iotaAreaCode);

    return internalSetPrecision(iotaAreaCode, codePrecision, decoded);
}

/**
 * Set the precision of an area code.
 * @private
 * @param iotaAreaCode The IOTA Area Code to set the precision.
 * @param codePrecision The new precision to set.
 * @param decoded The decoded area code.
 * @returns The updated precision area code.
 */
export function internalSetPrecision(iotaAreaCode: string, codePrecision: number, decoded: IacCodeArea): string {
    if (PRECISIONS.indexOf(codePrecision) < 0) {
        throw new Error(`codePrecision must be one of ${PRECISIONS.join(", ")}`);
    }

    if (codePrecision === decoded.codePrecision) {
        return iotaAreaCode;
    } else {
        // The new code precision is less than the current one
        // so just strip back the characters and pad
        if (codePrecision < decoded.codePrecision) {
            const reduced = iotaAreaCode.replace("9", "").substr(0, codePrecision);

            if (codePrecision <= 8) {
                return `${reduced}${"A".repeat(8 - codePrecision)}9`;
            } else {
                return `${reduced.substr(0, 8)}9${reduced.substr(8)}`;
            }
        } else {
            // New precision is higher so we need to do some maths
            // so just recalculate the location code based
            // on the current center.
            return encode(decoded.latitude, decoded.longitude, codePrecision);
        }
    }
}

/**
 * Get the display dimensions for a area code precision.
 * @param codePrecision The precision of an area code.
 * @returns The display dimensions for the code precision.
 */
export function getPrecisionDimensions(codePrecision: number): IacDimensions {
    const dimensions: { [id: number]: IacDimensions } = {
        2: {
            blocksSizeDegrees: 20,
            blocksSizeDegreesFormatted: "20°",
            sizeMetres: 2200000,
            sizeMetresFormatted: "2200km"
        },
        4: {
            blocksSizeDegrees: 1,
            blocksSizeDegreesFormatted: "1°",
            sizeMetres: 110000,
            sizeMetresFormatted: "110km"
        },
        6: {
            blocksSizeDegrees: 0.05,
            blocksSizeDegreesFormatted: "0.05°",
            sizeMetres: 5500,
            sizeMetresFormatted: "110km"
        },
        8: {
            blocksSizeDegrees: 0.0025,
            blocksSizeDegreesFormatted: "0.0025°",
            sizeMetres: 275,
            sizeMetresFormatted: "275m"
        },
        10: {
            blocksSizeDegrees: 0.000125,
            blocksSizeDegreesFormatted: "0.000125°",
            sizeMetres: 14,
            sizeMetresFormatted: "14m"
        },
        11: {
            blocksSizeDegrees: undefined,
            blocksSizeDegreesFormatted: undefined,
            sizeMetres: 3.5,
            sizeMetresFormatted: "3.5m"
        }
    };

    if (!dimensions[codePrecision]) {
        throw new Error("codePrecision must be 2, 4, 6, 8, 10 or 11");
    }

    return dimensions[codePrecision];
}
