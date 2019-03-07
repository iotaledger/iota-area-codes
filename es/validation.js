"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const open_location_code_typescript_1 = require("open-location-code-typescript");
const alphabet_1 = require("./alphabet");
const internal_1 = require("./internal");
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
        codeIsValid = open_location_code_typescript_1.default.isValid(internal_1.iacToOlcInternal(iotaAreaCode));
    }
    return codeIsValid;
}
exports.isValid = isValid;
/**
 * Is the IOTA Area Code a valid partial code.
 * @param iotaAreaCode The IOTA Area Code to validate.
 * @returns True if the code is a partial.
 */
function isValidPartial(iotaAreaCode) {
    if (iotaAreaCode === undefined || iotaAreaCode === null || typeof iotaAreaCode !== "string" || iotaAreaCode.length > 9) {
        return false;
    }
    else {
        if (!iotaAreaCode.endsWith("AA9")) {
            return false;
        }
        else {
            const remaining = iotaAreaCode.replace(/A*9$/, "");
            if (remaining.length < 2 || remaining.length % 2 === 1) {
                return false;
            }
            else {
                // Check if all the remaining characters before the AA*9 are within our alphabet
                const re = new RegExp(`^[${alphabet_1.IAC_APHABET.substr(0, 20)}]*$`);
                return re.test(remaining);
            }
        }
    }
}
exports.isValidPartial = isValidPartial;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUZBQTZEO0FBQzdELHlDQUF5QztBQUN6Qyx5Q0FBOEM7QUFFOUM7Ozs7R0FJRztBQUNILFNBQWdCLE9BQU8sQ0FBQyxZQUFvQjtJQUN4Qyx1REFBdUQ7SUFDdkQsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxzQkFBVyxLQUFLLENBQUMsQ0FBQztJQUU3QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hDLElBQUksV0FBVyxFQUFFO1FBQ2Isb0NBQW9DO1FBQ3BDLFdBQVcsR0FBRyx1Q0FBZ0IsQ0FBQyxPQUFPLENBQUMsMkJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztLQUMxRTtJQUVELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFYRCwwQkFXQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixjQUFjLENBQUMsWUFBb0I7SUFDL0MsSUFBSSxZQUFZLEtBQUssU0FBUyxJQUFJLFlBQVksS0FBSyxJQUFJLElBQUksT0FBTyxZQUFZLEtBQUssUUFBUSxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3BILE9BQU8sS0FBSyxDQUFDO0tBQ2hCO1NBQU07UUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvQixPQUFPLEtBQUssQ0FBQztTQUNoQjthQUFNO1lBQ0gsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFbkQsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3BELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNILGdGQUFnRjtnQkFDaEYsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxzQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUUzRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7U0FDSjtLQUNKO0FBQ0wsQ0FBQztBQW5CRCx3Q0FtQkMifQ==