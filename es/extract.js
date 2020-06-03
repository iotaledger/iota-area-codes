"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9leHRyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUF5QztBQUV6Qzs7OztHQUlHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLE1BQWM7SUFDbEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxzQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssc0JBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLHNCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBWSxzQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMzSixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQzFDLENBQUM7QUFKRCwwQkFJQyJ9