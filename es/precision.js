"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrecisionDimensions = exports.internalSetPrecision = exports.setPrecision = exports.increasePrecision = exports.decreasePrecision = exports.PRECISIONS = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlY2lzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ByZWNpc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBOEM7QUFJOUM7O0dBRUc7QUFDVSxRQUFBLFVBQVUsR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFekQ7Ozs7R0FJRztBQUNILFNBQWdCLGlCQUFpQixDQUFDLFlBQW9CO0lBQ2xELE1BQU0sT0FBTyxHQUFHLG1CQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFckMsSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLGtCQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsT0FBTyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsa0JBQVUsQ0FBQyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbEgsQ0FBQztBQVJELDhDQVFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGlCQUFpQixDQUFDLFlBQW9CO0lBQ2xELE1BQU0sT0FBTyxHQUFHLG1CQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFckMsSUFBSSxPQUFPLENBQUMsYUFBYSxJQUFJLGtCQUFVLENBQUMsa0JBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDNUQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsT0FBTyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsa0JBQVUsQ0FBQyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFD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