"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padPartial = exports.toOpenLocationCode = exports.fromOpenLocationCode = exports.decode = exports.encode = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb252ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlGQUE2RDtBQUM3RCx5Q0FBc0Q7QUFDdEQsbURBQWdEO0FBRWhELHlDQUE4QztBQUM5Qyw2Q0FBdUM7QUFFdkM7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsTUFBTSxDQUFDLFFBQWdCLEVBQUUsU0FBaUIsRUFBRSxZQUFvQiw2QkFBYSxDQUFDLE1BQU07SUFDaEcsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1FBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxvQkFBb0IsQ0FBQyx1Q0FBZ0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUFORCx3QkFNQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixNQUFNLENBQUMsWUFBb0I7SUFDdkMsTUFBTSxHQUFHLEdBQUcsdUNBQWdCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEYsT0FBTztRQUNILFFBQVEsRUFBRSxHQUFHLENBQUMsY0FBYztRQUM1QixTQUFTLEVBQUUsR0FBRyxDQUFDLGVBQWU7UUFDOUIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxVQUFVO1FBQzdCLFdBQVcsRUFBRSxHQUFHLENBQUMsVUFBVTtRQUMzQixZQUFZLEVBQUUsR0FBRyxDQUFDLFVBQVU7UUFDNUIsWUFBWSxFQUFFLEdBQUcsQ0FBQyxXQUFXO1FBQzdCLGFBQWEsRUFBRSxHQUFHLENBQUMsV0FBVztLQUNqQyxDQUFDO0FBQ04sQ0FBQztBQVhELHdCQVdDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLG9CQUFvQixDQUFDLGdCQUF3QjtJQUN6RCxJQUFJLENBQUMsdUNBQWdCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM5QyxNQUFNLEdBQUcsR0FBRyxzQkFBVyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELEdBQUcsSUFBSSxzQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzNCO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBWkQsb0RBWUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsWUFBb0I7SUFDbkQsSUFBSSxDQUFDLG9CQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsT0FBTywyQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBTkQsZ0RBTUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLFlBQW9CO0lBQzNDLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQztJQUMxQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNuQixNQUFNLEdBQUcsR0FBRyxNQUFNLEdBQUcsQ0FBQztLQUN6QjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFURCxnQ0FTQyJ9