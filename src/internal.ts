import { IAC_APHABET, OLC_APHABET } from "./alphabet";

/**
 * Convert the IOTA Area Code to Open Location Code with no validation.
 * @private
 * @param iotaAreaCode The IOTA Area Code to convert.
 * @returns The Open Location Code.
 */
export function iacToOlcInternal(iotaAreaCode: string): string {
    let olc = "";
    for (let i = 0; i < iotaAreaCode.length; i++) {
        const idx = IAC_APHABET.indexOf(iotaAreaCode[i]);
        olc += OLC_APHABET[idx];
    }

    return olc;
}
