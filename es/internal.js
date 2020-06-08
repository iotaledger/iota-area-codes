"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iacToOlcInternal = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJuYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW50ZXJuYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQXNEO0FBRXREOzs7OztHQUtHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsWUFBb0I7SUFDakQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUMsTUFBTSxHQUFHLEdBQUcsc0JBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsR0FBRyxJQUFJLHNCQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFSRCw0Q0FRQyJ9