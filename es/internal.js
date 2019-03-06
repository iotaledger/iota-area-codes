"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alphabet_1 = require("./alphabet");
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
exports.iacToOlcInternal = iacToOlcInternal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW50ZXJuYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBc0Q7QUFFdEQ7Ozs7O0dBS0c7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxZQUFvQjtJQUNqRCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQyxNQUFNLEdBQUcsR0FBRyxzQkFBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxHQUFHLElBQUksc0JBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMzQjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQVJELDRDQVFDIn0=