(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('open-location-code-typescript')) :
    typeof define === 'function' && define.amd ? define(['exports', 'open-location-code-typescript'], factory) :
    (global = global || self, factory(global.IotaAreaCodes = {}, global.OpenLocationCode));
}(this, (function (exports, OpenLocationCode) { 'use strict';

    OpenLocationCode = OpenLocationCode && Object.prototype.hasOwnProperty.call(OpenLocationCode, 'default') ? OpenLocationCode['default'] : OpenLocationCode;

    /**
     * Code precision to use for locations.
     */
    var CodePrecision = /** @class */ (function () {
        function CodePrecision() {
        }
        /**
         * Provides a normal precision code, approximately 14x14 meters.
         */
        CodePrecision.NORMAL = 10;
        /**
         * Provides an extra precision code, approximately 2x3 meters.
         */
        CodePrecision.EXTRA = 11;
        return CodePrecision;
    }());

    /**
     * The character set used in Open Location Code encoding.
     * @private
     */
    var OLC_APHABET = "23456789CFGHJMPQRVWX0+";
    /**
     * The character set used in IOTA Area Code encoding.
     * @private
     */
    var IAC_APHABET = "FGHJKLMNOPQRSTUVXWYZA9";

    /**
     * Convert the IOTA Area Code to Open Location Code with no validation.
     * @private
     * @param iotaAreaCode The IOTA Area Code to convert.
     * @returns The Open Location Code.
     */
    function iacToOlcInternal(iotaAreaCode) {
        var olc = "";
        for (var i = 0; i < iotaAreaCode.length; i++) {
            var idx = IAC_APHABET.indexOf(iotaAreaCode[i]);
            olc += OLC_APHABET[idx];
        }
        return olc;
    }

    /**
     * Is the IOTA Area Code valid.
     * @param iotaAreaCode The IOTA Area Code to validate.
     * @returns True if the code is valid.
     */
    function isValid(iotaAreaCode) {
        // Check if all the characters fall within our alphabet
        var re = new RegExp("^[" + IAC_APHABET + "]*$");
        var codeIsValid = re.test(iotaAreaCode);
        if (codeIsValid) {
            // Now validate using OLC validation
            codeIsValid = OpenLocationCode.isFull(iacToOlcInternal(iotaAreaCode));
        }
        return codeIsValid;
    }
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
                var remaining = iotaAreaCode.replace(/A*9$/, "");
                if (remaining.length < 2 || remaining.length % 2 === 1) {
                    return false;
                }
                else {
                    // Check if all the remaining characters before the AA*9 are within our alphabet
                    var re = new RegExp("^[" + IAC_APHABET.substr(0, 20) + "]*$");
                    return re.test(remaining);
                }
            }
        }
    }

    /**
     * Encode a location into an IOTA Area Code.
     * @param latitude The latitude in signed decimal degrees. Values less than -90 will be clipped to -90, values over 90 will be clipped to 90.
     * @param longitude The longitude in signed decimal degrees. This will be normalised to the range -180 to 180.
     * @param precision The desired code length. If omitted, CodePrecision.NORMAL will be used. For precision CodePrecision.EXTRA is recommended.
     * @returns The IOTA Area Code for the location.
     */
    function encode(latitude, longitude, precision) {
        if (precision === void 0) { precision = CodePrecision.NORMAL; }
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
    function decode(iotaAreaCode) {
        var olc = OpenLocationCode.decode(toOpenLocationCode(padPartial(iotaAreaCode)));
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
    function fromOpenLocationCode(openLocationCode) {
        if (!OpenLocationCode.isValid(openLocationCode)) {
            throw new Error("The openLocationCode is not valid");
        }
        var iac = "";
        for (var i = 0; i < openLocationCode.length; i++) {
            var idx = OLC_APHABET.indexOf(openLocationCode[i]);
            iac += IAC_APHABET[idx];
        }
        return iac;
    }
    /**
     * Convert the IOTA Area Code to Open Location Code.
     * @param iotaAreaCode The IOTA Area Code to convert.
     * @returns The Open Location Code.
     */
    function toOpenLocationCode(iotaAreaCode) {
        if (!isValid(iotaAreaCode)) {
            throw new Error("The iotaAreaCode is not valid");
        }
        return iacToOlcInternal(iotaAreaCode);
    }
    /**
     * Pad a partial IAC to the minimum full.
     * @param iotaAreaCode The area code to pad.
     * @returns The padded code.
     */
    function padPartial(iotaAreaCode) {
        var padded = iotaAreaCode;
        if (padded.length < 8) {
            padded = padded + "A".repeat(8 - padded.length);
        }
        if (padded.length < 9) {
            padded = padded + "9";
        }
        return padded;
    }

    /**
     * All the available precisions.
     */
    var PRECISIONS = [2, 4, 6, 8, 10, 11];
    /**
     * Decrease the precision of an area code.
     * @param iotaAreaCode The IOTA Area Code to decrease the precision.
     * @returns The decreased precision area code.
     */
    function decreasePrecision(iotaAreaCode) {
        var decoded = decode(iotaAreaCode);
        if (decoded.codePrecision <= PRECISIONS[0]) {
            throw new Error("The precision can not be decreased any more");
        }
        return internalSetPrecision(iotaAreaCode, PRECISIONS[PRECISIONS.indexOf(decoded.codePrecision) - 1], decoded);
    }
    /**
     * Increase the precision of an area code.
     * @param iotaAreaCode The IOTA Area Code to increase the precision.
     * @returns The increased precision area code.
     */
    function increasePrecision(iotaAreaCode) {
        var decoded = decode(iotaAreaCode);
        if (decoded.codePrecision >= PRECISIONS[PRECISIONS.length - 1]) {
            throw new Error("The precision can not be increased any more");
        }
        return internalSetPrecision(iotaAreaCode, PRECISIONS[PRECISIONS.indexOf(decoded.codePrecision) + 1], decoded);
    }
    /**
     * Set the precision of an area code.
     * @param iotaAreaCode The IOTA Area Code to set the precision.
     * @param codePrecision The new precision to set.
     * @returns The updated precision area code.
     */
    function setPrecision(iotaAreaCode, codePrecision) {
        var decoded = decode(iotaAreaCode);
        return internalSetPrecision(iotaAreaCode, codePrecision, decoded);
    }
    /**
     * Set the precision of an area code.
     * @private
     * @param iotaAreaCode The IOTA Area Code to set the precision.
     * @param codePrecision The new precision to set.
     * @param decoded The decoded area code.
     * @returns The updated precision area code.
     */
    function internalSetPrecision(iotaAreaCode, codePrecision, decoded) {
        if (PRECISIONS.indexOf(codePrecision) < 0) {
            throw new Error("codePrecision must be one of " + PRECISIONS.join(", "));
        }
        if (codePrecision === decoded.codePrecision) {
            return iotaAreaCode;
        }
        else {
            // The new code precision is less than the current one
            // so just strip back the characters and pad
            if (codePrecision < decoded.codePrecision) {
                var reduced = iotaAreaCode.replace("9", "").substr(0, codePrecision);
                if (codePrecision <= 8) {
                    return "" + reduced + "A".repeat(8 - codePrecision) + "9";
                }
                else {
                    return reduced.substr(0, 8) + "9" + reduced.substr(8);
                }
            }
            else {
                // New precision is higher so we need to do some maths
                // so just recalculate the location code based
                // on the current center.
                return encode(decoded.latitude, decoded.longitude, codePrecision);
            }
        }
    }
    /**
     * Get the display dimensions for a area code precision.
     * @param codePrecision The precision of an area code.
     * @returns The display dimensions for the code precision.
     */
    function getPrecisionDimensions(codePrecision) {
        var dimensions = {
            2: {
                blocksSizeDegrees: 20,
                blocksSizeDegreesFormatted: "20°",
                sizeMetres: 2200000,
                sizeMetresFormatted: "2200km"
            },
            4: {
                blocksSizeDegrees: 1,
                blocksSizeDegreesFormatted: "1°",
                sizeMetres: 110000,
                sizeMetresFormatted: "110km"
            },
            6: {
                blocksSizeDegrees: 0.05,
                blocksSizeDegreesFormatted: "0.05°",
                sizeMetres: 5500,
                sizeMetresFormatted: "110km"
            },
            8: {
                blocksSizeDegrees: 0.0025,
                blocksSizeDegreesFormatted: "0.0025°",
                sizeMetres: 275,
                sizeMetresFormatted: "275m"
            },
            10: {
                blocksSizeDegrees: 0.000125,
                blocksSizeDegreesFormatted: "0.000125°",
                sizeMetres: 14,
                sizeMetresFormatted: "14m"
            },
            11: {
                blocksSizeDegrees: undefined,
                blocksSizeDegreesFormatted: undefined,
                sizeMetres: 3.5,
                sizeMetresFormatted: "3.5m"
            }
        };
        if (!dimensions[codePrecision]) {
            throw new Error("codePrecision must be 2, 4, 6, 8, 10 or 11");
        }
        return dimensions[codePrecision];
    }

    /**
     * Extract an IOTA Area Code from trytes.
     * @param trytes The trytes from which to try and extract the IOTA Area Code.
     * @returns The IOTA Area Code if one could be extracted, or undefined.
     */
    function extract(trytes) {
        var reString = "([" + IAC_APHABET.substr(0, 9) + "][" + IAC_APHABET.substr(0, 18) + "][" + IAC_APHABET.substr(0, 21) + "]{6}9(?:[" + IAC_APHABET.substr(0, 20) + "]{2,3})?)";
        var result = new RegExp(reString).exec(trytes);
        return result ? result[1] : undefined;
    }

    exports.CodePrecision = CodePrecision;
    exports.PRECISIONS = PRECISIONS;
    exports.decode = decode;
    exports.decreasePrecision = decreasePrecision;
    exports.encode = encode;
    exports.extract = extract;
    exports.fromOpenLocationCode = fromOpenLocationCode;
    exports.getPrecisionDimensions = getPrecisionDimensions;
    exports.increasePrecision = increasePrecision;
    exports.internalSetPrecision = internalSetPrecision;
    exports.isValid = isValid;
    exports.isValidPartial = isValidPartial;
    exports.padPartial = padPartial;
    exports.setPrecision = setPrecision;
    exports.toOpenLocationCode = toOpenLocationCode;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
