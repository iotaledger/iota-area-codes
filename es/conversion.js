"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_location_code_typescript_1 = require("open-location-code-typescript");
const alphabet_1 = require("./alphabet");
const codePrecision_1 = require("./codePrecision");
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
    const olc = open_location_code_typescript_1.default.decode(toOpenLocationCode(iotaAreaCode));
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
    if (!isValid(iotaAreaCode)) {
        throw new Error("The iotaAreaCode is not valid");
    }
    return iacToOlcInternal(iotaAreaCode);
}
exports.toOpenLocationCode = toOpenLocationCode;
/**
 * Is the IOTA Area Code valid.
 * @param iotaAreaCode The IOTA Area Code to validate.
 * @returns True if the code is valid.
 */
function isValid(iotaAreaCode) {
    // Check if all the characters fall within our alphabet
    const re = new RegExp(`^[${alphabet_1.IAC_APHABET}]*$`);
    let codeIsValid = re.test(iotaAreaCode);
    if (codeIsValid) {
        // Now validate using OLC validation
        codeIsValid = open_location_code_typescript_1.default.isValid(iacToOlcInternal(iotaAreaCode));
    }
    return codeIsValid;
}
exports.isValid = isValid;
/**
 * Convert the IOTA Area Code to Open Location Code with no validation.
 * @private
 * @param iotaAreaCode The IOTA Area Code to convert.
 * @returns The Open Location Code.
 */
function iacToOlcInternal(iotaAreaCode) {
    let olc = "";
    for (let i = 0; i < iotaAreaCode.length; i++) {
        const idx = alphabet_1.IAC_APHABET.indexOf(iotaAreaCode[i]);
        olc += alphabet_1.OLC_APHABET[idx];
    }
    return olc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb252ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUZBQTZEO0FBQzdELHlDQUFzRDtBQUN0RCxtREFBZ0Q7QUFHaEQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsTUFBTSxDQUFDLFFBQWdCLEVBQUUsU0FBaUIsRUFBRSxZQUFvQiw2QkFBYSxDQUFDLE1BQU07SUFDaEcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxvQkFBb0IsQ0FBQyx1Q0FBZ0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUFORCx3QkFNQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixNQUFNLENBQUMsWUFBb0I7SUFDdkMsTUFBTSxHQUFHLEdBQUcsdUNBQWdCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDdEUsT0FBTztRQUNILFFBQVEsRUFBRSxHQUFHLENBQUMsY0FBYztRQUM1QixTQUFTLEVBQUUsR0FBRyxDQUFDLGVBQWU7UUFDOUIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxVQUFVO1FBQzdCLFdBQVcsRUFBRSxHQUFHLENBQUMsVUFBVTtRQUMzQixZQUFZLEVBQUUsR0FBRyxDQUFDLFVBQVU7UUFDNUIsWUFBWSxFQUFFLEdBQUcsQ0FBQyxXQUFXO1FBQzdCLGFBQWEsRUFBRSxHQUFHLENBQUMsV0FBVztLQUNqQyxDQUFDO0FBQ04sQ0FBQztBQVhELHdCQVdDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLG9CQUFvQixDQUFDLGdCQUF3QjtJQUN6RCxJQUFJLENBQUMsdUNBQWdCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM5QyxNQUFNLEdBQUcsR0FBRyxzQkFBVyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELEdBQUcsSUFBSSxzQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzNCO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBWkQsb0RBWUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsWUFBb0I7SUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7S0FDcEQ7SUFFRCxPQUFPLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFORCxnREFNQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixPQUFPLENBQUMsWUFBb0I7SUFDeEMsdURBQXVEO0lBQ3ZELE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssc0JBQVcsS0FBSyxDQUFDLENBQUM7SUFFN0MsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QyxJQUFJLFdBQVcsRUFBRTtRQUNiLG9DQUFvQztRQUNwQyxXQUFXLEdBQUcsdUNBQWdCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7S0FDMUU7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBWEQsMEJBV0M7QUFFRDs7Ozs7R0FLRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsWUFBb0I7SUFDMUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUMsTUFBTSxHQUFHLEdBQUcsc0JBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsR0FBRyxJQUFJLHNCQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMifQ==