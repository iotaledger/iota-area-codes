import OpenLocationCode from "open-location-code-typescript";
import { IAC_APHABET, OLC_APHABET } from "./alphabet";
import { CodePrecision } from "./codePrecision";
import { IacCodeArea } from "./iacCodeArea";

/**
 * Encode a location into an IOTA Area Code.
 * @param latitude The latitude in signed decimal degrees. Values less than -90 will be clipped to -90, values over 90 will be clipped to 90.
 * @param longitude The longitude in signed decimal degrees. This will be normalised to the range -180 to 180.
 * @param precision The desired code length. If omitted, CodePrecision.NORMAL will be used. For precision CodePrecision.EXTRA is recommended.
 * @returns The IOTA Area Code for the location.
 */
export function encode(latitude: number, longitude: number, precision: number = CodePrecision.NORMAL): string {
    if (precision < 2) {
        throw new Error("The precision is not valid");
    }

    return fromOpenLocationCode(OpenLocationCode.encode(latitude, longitude, precision));
}

/**
 * Decode an IOTA Area Code into a location.
 * @param iotaAreaCode The IOTA Area Code to convert.
 * @returns The location object.
 */
export function decode(iotaAreaCode: string): IacCodeArea {
    const olc = OpenLocationCode.decode(toOpenLocationCode(iotaAreaCode));
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

/**
 * Convert the Open Location Code to IOTA Area Code.
 * @param openLocationCode The Open Location Code to convert.
 * @returns The IOTA Area Code.
 */
export function fromOpenLocationCode(openLocationCode: string): string {
    if (!OpenLocationCode.isValid(openLocationCode)) {
        throw new Error("The openLocationCode is not valid");
    }

    let iac = "";
    for (let i = 0; i < openLocationCode.length; i++) {
        const idx = OLC_APHABET.indexOf(openLocationCode[i]);
        iac += IAC_APHABET[idx];
    }

    return iac;
}

/**
 * Convert the IOTA Area Code to Open Location Code.
 * @param iotaAreaCode The IOTA Area Code to convert.
 * @returns The Open Location Code.
 */
export function toOpenLocationCode(iotaAreaCode: string): string {
    if (!isValid(iotaAreaCode)) {
        throw new Error("The iotaAreaCode is not valid");
    }

    return iacToOlcInternal(iotaAreaCode);
}

/**
 * Is the IOTA Area Code valid.
 * @param iotaAreaCode The IOTA Area Code to validate.
 * @returns True if the code is valid.
 */
export function isValid(iotaAreaCode: string): boolean {
    // Check if all the characters fall within our alphabet
    const re = new RegExp(`^[${IAC_APHABET}]*$`);

    let codeIsValid = re.test(iotaAreaCode);
    if (codeIsValid) {
        // Now validate using OLC validation
        codeIsValid = OpenLocationCode.isValid(iacToOlcInternal(iotaAreaCode));
    }

    return codeIsValid;
}

/**
 * Convert the IOTA Area Code to Open Location Code with no validation.
 * @private
 * @param iotaAreaCode The IOTA Area Code to convert.
 * @returns The Open Location Code.
 */
function iacToOlcInternal(iotaAreaCode: string): string {
    let olc = "";
    for (let i = 0; i < iotaAreaCode.length; i++) {
        const idx = IAC_APHABET.indexOf(iotaAreaCode[i]);
        olc += OLC_APHABET[idx];
    }

    return olc;
}
