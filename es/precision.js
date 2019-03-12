"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversion_1 = require("./conversion");
/**
 * All the available precisions.
 */
exports.PRECISIONS = [2, 4, 6, 8, 10, 11];
/**
 * Decrease the precision of an area code.
 * @param iotaAreaCode The IOTA Area Code to decrease the precision.
 * @returns The decreased precision area code.
 */
function decreasePrecision(iotaAreaCode) {
    const decoded = conversion_1.decode(iotaAreaCode);
    if (decoded.codePrecision <= exports.PRECISIONS[0]) {
        throw new Error("The precision can not be decreased any more");
    }
    return internalSetPrecision(iotaAreaCode, exports.PRECISIONS[exports.PRECISIONS.indexOf(decoded.codePrecision) - 1], decoded);
}
exports.decreasePrecision = decreasePrecision;
/**
 * Increase the precision of an area code.
 * @param iotaAreaCode The IOTA Area Code to increase the precision.
 * @returns The increased precision area code.
 */
function increasePrecision(iotaAreaCode) {
    const decoded = conversion_1.decode(iotaAreaCode);
    if (decoded.codePrecision >= exports.PRECISIONS[exports.PRECISIONS.length - 1]) {
        throw new Error("The precision can not be increased any more");
    }
    return internalSetPrecision(iotaAreaCode, exports.PRECISIONS[exports.PRECISIONS.indexOf(decoded.codePrecision) + 1], decoded);
}
exports.increasePrecision = increasePrecision;
/**
 * Set the precision of an area code.
 * @param iotaAreaCode The IOTA Area Code to set the precision.
 * @param codePrecision The new precision to set.
 * @returns The updated precision area code.
 */
function setPrecision(iotaAreaCode, codePrecision) {
    const decoded = conversion_1.decode(iotaAreaCode);
    return internalSetPrecision(iotaAreaCode, codePrecision, decoded);
}
exports.setPrecision = setPrecision;
/**
 * Set the precision of an area code.
 * @private
 * @param iotaAreaCode The IOTA Area Code to set the precision.
 * @param codePrecision The new precision to set.
 * @param decoded The decoded area code.
 * @returns The updated precision area code.
 */
function internalSetPrecision(iotaAreaCode, codePrecision, decoded) {
    if (exports.PRECISIONS.indexOf(codePrecision) < 0) {
        throw new Error(`codePrecision must be one of ${exports.PRECISIONS.join(", ")}`);
    }
    if (codePrecision === decoded.codePrecision) {
        return iotaAreaCode;
    }
    else {
        // The new code precision is less than the current one
        // so just strip back the characters and pad
        if (codePrecision < decoded.codePrecision) {
            const reduced = iotaAreaCode.replace("9", "").substr(0, codePrecision);
            if (codePrecision <= 8) {
                return `${reduced}${"A".repeat(8 - codePrecision)}9`;
            }
            else {
                return `${reduced.substr(0, 8)}9${reduced.substr(8)}`;
            }
        }
        else {
            // New precision is higher so we need to do some maths
            // so just recalculate the location code based
            // on the current center.
            return conversion_1.encode(decoded.latitude, decoded.longitude, codePrecision);
        }
    }
}
exports.internalSetPrecision = internalSetPrecision;
/**
 * Get the display dimensions for a area code precision.
 * @param codePrecision The precision of an area code.
 * @returns The display dimensions for the code precision.
 */
function getPrecisionDimensions(codePrecision) {
    const dimensions = {
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
exports.getPrecisionDimensions = getPrecisionDimensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlY2lzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ByZWNpc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE4QztBQUk5Qzs7R0FFRztBQUNVLFFBQUEsVUFBVSxHQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUV6RDs7OztHQUlHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsWUFBb0I7SUFDbEQsTUFBTSxPQUFPLEdBQUcsbUJBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVyQyxJQUFJLE9BQU8sQ0FBQyxhQUFhLElBQUksa0JBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7S0FDbEU7SUFFRCxPQUFPLG9CQUFvQixDQUFDLFlBQVksRUFBRSxrQkFBVSxDQUFDLGtCQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNsSCxDQUFDO0FBUkQsOENBUUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsaUJBQWlCLENBQUMsWUFBb0I7SUFDbEQsTUFBTSxPQUFPLEdBQUcsbUJBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVyQyxJQUFJLE9BQU8sQ0FBQyxhQUFhLElBQUksa0JBQVUsQ0FBQyxrQkFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtRQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7S0FDbEU7SUFFRCxPQUFPLG9CQUFvQixDQUFDLFlBQVksRUFBRSxrQkFBVSxDQUFDLGtCQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNs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