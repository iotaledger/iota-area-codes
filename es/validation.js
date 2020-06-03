"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPartial = exports.isValid = void 0;
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
        codeIsValid = open_location_code_typescript_1.default.isFull(internal_1.iacToOlcInternal(iotaAreaCode));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlGQUE2RDtBQUM3RCx5Q0FBeUM7QUFDekMseUNBQThDO0FBRTlDOzs7O0dBSUc7QUFDSCxTQUFnQixPQUFPLENBQUMsWUFBb0I7SUFDeEMsdURBQXVEO0lBQ3ZELE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssc0JBQVcsS0FBSyxDQUFDLENBQUM7SUFFN0MsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QyxJQUFJLFdBQVcsRUFBRTtRQUNiLG9DQUFvQztRQUNwQyxXQUFXLEdBQUcsdUNBQWdCLENBQUMsTUFBTSxDQUFDLDJCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7S0FDekU7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBWEQsMEJBV0M7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLFlBQW9CO0lBQy9DLElBQUksWUFBWSxLQUFLLFNBQVMsSUFBSSxZQUFZLEtBQUssSUFBSSxJQUFJLE9BQU8sWUFBWSxLQUFLLFFBQVEsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNwSCxPQUFPLEtBQUssQ0FBQztLQUNoQjtTQUFNO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUM7U0FDaEI7YUFBTTtZQUNILE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRW5ELElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLEtBQUssQ0FBQzthQUNoQjtpQkFBTTtnQkFDSCxnRkFBZ0Y7Z0JBQ2hGLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssc0JBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFM0QsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7S0FDSjtBQUNMLENBQUM7QUFuQkQsd0NBbUJDIn0=