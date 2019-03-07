import OpenLocationCode from "open-location-code-typescript";
import { IAC_APHABET } from "./alphabet";
import { iacToOlcInternal } from "./internal";

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
 * Is the IOTA Area Code a valid partial code.
 * @param iotaAreaCode The IOTA Area Code to validate.
 * @returns True if the code is a partial.
 */
export function isValidPartial(iotaAreaCode: string): boolean {
    if (iotaAreaCode === undefined || iotaAreaCode === null || typeof iotaAreaCode !== "string" || iotaAreaCode.length > 9) {
        return false;
    } else {
        if (!iotaAreaCode.endsWith("AA9")) {
            return false;
        } else {
            const remaining = iotaAreaCode.replace(/A*9$/, "");

            if (remaining.length < 2 || remaining.length % 2 === 1) {
                return false;
            } else {
                // Check if all the remaining characters before the AA*9 are within our alphabet
                const re = new RegExp(`^[${IAC_APHABET.substr(0, 20)}]*$`);

                return re.test(remaining);
            }
        }
    }
}
