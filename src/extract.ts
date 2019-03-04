import { IAC_APHABET } from "./alphabet";

/**
 * Extract an IOTA Area Code from trytes.
 * @param trytes The trytes from which to try and extract the IOTA Area Code.
 * @returns The IOTA Area Code if one could be extracted, or undefined.
 */
export function extract(trytes: string): string | undefined {
    const reString = `([${IAC_APHABET.substr(0, 9)}][${IAC_APHABET.substr(0, 18)}][${IAC_APHABET.substr(0, 21)}]{6}9(?:[${IAC_APHABET.substr(0, 20)}]{2,3})?)`;
    const result = new RegExp(reString).exec(trytes);
    return result ? result[1] : undefined;
}
