"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alphabet_1 = require("./alphabet");
/**
 * Extract an IOTA Area Code from trytes.
 * @param trytes The trytes from which to try and extract the IOTA Area Code.
 * @returns The IOTA Area Code if one could be extracted, or undefined.
 */
function extract(trytes) {
    const reString = `([${alphabet_1.IAC_APHABET.substr(0, 9)}][${alphabet_1.IAC_APHABET.substr(0, 18)}][${alphabet_1.IAC_APHABET.substr(0, 21)}]{6}9(?:[${alphabet_1.IAC_APHABET.substr(0, 20)}]{2,3})?)`;
    const result = new RegExp(reString).exec(trytes);
    return result ? result[1] : undefined;
}
exports.extract = extract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9leHRyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQXlDO0FBRXpDOzs7O0dBSUc7QUFDSCxTQUFnQixPQUFPLENBQUMsTUFBYztJQUNsQyxNQUFNLFFBQVEsR0FBRyxLQUFLLHNCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxzQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssc0JBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLHNCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDO0lBQzNKLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDMUMsQ0FBQztBQUpELDBCQUlDIn0=