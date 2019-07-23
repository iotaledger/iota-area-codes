"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_location_code_typescript_1 = require("open-location-code-typescript");
const alphabet_1 = require("./alphabet");
const codePrecision_1 = require("./codePrecision");
const internal_1 = require("./internal");
const validation_1 = require("./validation");
/**
 * Encode a location into an IOTA Area Code.
 * @param latitude The latitude in signed decimal degrees. Values less than -90 will be clipped to -90, values over 90 will be clipped to 90.
 * @param longitude The longitude in signed decimal degrees. This will be normalised to the range -180 to 180.
 * @param precision The desired code length. If omitted, CodePrecision.NORMAL will be used. For precision CodePrecision.EXTRA is recommended.
 * @returns The IOTA Area Code for the location.
 */
function encode(latitude, longitude, precision = codePrecision_1.CodePrecision.NORMAL) {
    if (precision < 2) {
        throw new Error("The precision is not valid");
    }
    return fromOpenLocationCode(open_location_code_typescript_1.default.encode(latitude, longitude, precision));
}
exports.encode = encode;
/**
 * Decode an IOTA Area Code into a location.
 * @param iotaAreaCode The IOTA Area Code to convert.
 * @returns The location object.
 */
function decode(iotaAreaCode) {
    const olc = open_location_code_typescript_1.default.decode(toOpenLocationCode(padPartial(iotaAreaCode)));
    return {
        latitude: olc.latitudeCenter,
        longitude: olc.longitudeCenter,
        codePrecision: olc.codeLength,
        latitudeLow: olc.latitudeLo,
        latitudeHigh: olc.latitudeHi,
        longitudeLow: olc.longitudeLo,
        longitudeHigh: olc.longitudeHi
    };
}
exports.decode = decode;
/**
 * Convert the Open Location Code to IOTA Area Code.
 * @param openLocationCode The Open Location Code to convert.
 * @returns The IOTA Area Code.
 */
function fromOpenLocationCode(openLocationCode) {
    if (!open_location_code_typescript_1.default.isValid(openLocationCode)) {
        throw new Error("The openLocationCode is not valid");
    }
    let iac = "";
    for (let i = 0; i < openLocationCode.length; i++) {
        const idx = alphabet_1.OLC_APHABET.indexOf(openLocationCode[i]);
        iac += alphabet_1.IAC_APHABET[idx];
    }
    return iac;
}
exports.fromOpenLocationCode = fromOpenLocationCode;
/**
 * Convert the IOTA Area Code to Open Location Code.
 * @param iotaAreaCode The IOTA Area Code to convert.
 * @returns The Open Location Code.
 */
function toOpenLocationCode(iotaAreaCode) {
    if (!validation_1.isValid(iotaAreaCode)) {
        throw new Error("The iotaAreaCode is not valid");
    }
    return internal_1.iacToOlcInternal(iotaAreaCode);
}
exports.toOpenLocationCode = toOpenLocationCode;
/**
 * Pad a partial IAC to the minimum full.
 * @param iotaAreaCode The area code to pad.
 * @returns The padded code.
 */
function padPartial(iotaAreaCode) {
    let padded = iotaAreaCode;
    if (padded.length < 8) {
        padded = padded + "A".repeat(8 - padded.length);
    }
    if (padded.length < 9) {
        padded = `${padded}9`;
    }
    return padded;
}
exports.padPartial = padPartial;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb252ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUZBQTZEO0FBQzdELHlDQUFzRDtBQUN0RCxtREFBZ0Q7QUFFaEQseUNBQThDO0FBQzlDLDZDQUF1QztBQUV2Qzs7Ozs7O0dBTUc7QUFDSCxTQUFnQixNQUFNLENBQUMsUUFBZ0IsRUFBRSxTQUFpQixFQUFFLFlBQW9CLDZCQUFhLENBQUMsTUFBTTtJQUNoRyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7S0FDakQ7SUFFRCxPQUFPLG9CQUFvQixDQUFDLHVDQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDekYsQ0FBQztBQU5ELHdCQU1DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxZQUFvQjtJQUN2QyxNQUFNLEdBQUcsR0FBRyx1Q0FBZ0IsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRixPQUFPO1FBQ0gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxjQUFjO1FBQzVCLFNBQVMsRUFBRSxHQUFHLENBQUMsZUFBZTtRQUM5QixhQUFhLEVBQUUsR0FBRyxDQUFDLFVBQVU7UUFDN0IsV0FBVyxFQUFFLEdBQUcsQ0FBQyxVQUFVO1FBQzNCLFlBQVksRUFBRSxHQUFHLENBQUMsVUFBVTtRQUM1QixZQUFZLEVBQUUsR0FBRyxDQUFDLFdBQVc7UUFDN0IsYUFBYSxFQUFFLEdBQUcsQ0FBQyxXQUFXO0tBQ2pDLENBQUM7QUFDTixDQUFDO0FBWEQsd0JBV0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsZ0JBQXdCO0lBQ3pELElBQUksQ0FBQyx1Q0FBZ0IsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUM3QyxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FDeEQ7SUFFRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzlDLE1BQU0sR0FBRyxHQUFHLHNCQUFXLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsR0FBRyxJQUFJLHNCQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFaRCxvREFZQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixrQkFBa0IsQ0FBQyxZQUFvQjtJQUNuRCxJQUFJLENBQUMsb0JBQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7S0FDcEQ7SUFFRCxPQUFPLDJCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFORCxnREFNQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixVQUFVLENBQUMsWUFBb0I7SUFDM0MsSUFBSSxNQUFNLEdBQUcsWUFBWSxDQUFDO0lBQzFCLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbkIsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkQ7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLE1BQU0sR0FBRyxHQUFHLE1BQU0sR0FBRyxDQUFDO0tBQ3pCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVRELGdDQVNDIn0=