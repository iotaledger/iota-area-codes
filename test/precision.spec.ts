import { decreasePrecision, getPrecisionDimensions, increasePrecision, setPrecision } from "../src/precision";

test("getPrecisionDimensions() can fail on invalid value", () => {
    const invalid = [undefined, 0, false, true, 1, 3, 5, 7, 9, 12];
    for (let i = 0; i < invalid.length; i++) {
        expect(() => {
            getPrecisionDimensions(<number>invalid[i]);
        }).toThrowError(/codePrecision must be/);
    }
});

test("getPrecisionDimensions() can get dimensions", () => {
    const precisions = [
        { precision: 2, sizeMetres: 2200000 },
        { precision: 4, sizeMetres: 110000 },
        { precision: 6, sizeMetres: 5500 },
        { precision: 8, sizeMetres: 275 },
        { precision: 10, sizeMetres: 14 },
        { precision: 11, sizeMetres: 3.5 }
    ];

    for (let i = 0; i < precisions.length; i++) {
        expect(getPrecisionDimensions(precisions[i].precision).sizeMetres).toBe(precisions[i].sizeMetres);
    }
});

test("decreasePrecision() can fail on min precision", () => {
    expect(() => {
        decreasePrecision("NPAAAAAA9");
    }).toThrowError(/can not be/);
});

test("decreasePrecision() can reduce precision", () => {
    const precisions = [
        { areaCode: "NPHTQORL9XKP", reduced: "NPHTQORL9XK" },
        { areaCode: "NPHTQORL9XK", reduced: "NPHTQORL9" },
        { areaCode: "NPHTQORL9", reduced: "NPHTQOAA9" },
        { areaCode: "NPHTQOAA9", reduced: "NPHTAAAA9" },
        { areaCode: "NPHTAAAA9", reduced: "NPAAAAAA9" }
    ];

    for (let i = 0; i < precisions.length; i++) {
        expect(decreasePrecision(precisions[i].areaCode)).toBe(precisions[i].reduced);
    }
});

test("increasePrecision() can fail on max precision", () => {
    expect(() => {
        increasePrecision("NPHTQORL9XKP");
    }).toThrowError(/can not be/);
});

test("increasePrecision() can reduce precision", () => {
    const precisions = [
        { areaCode: "NPHTQORL9XK", reduced: "NPHTQORL9XKQ" },
        { areaCode: "NPHTQORL9", reduced: "NPHTQORL9QQ" },
        { areaCode: "NPHTQOAA9", reduced: "NPHTQOQQ9" },
        { areaCode: "NPHTAAAA9", reduced: "NPHTQQAA9" },
        { areaCode: "NPAAAAAA9", reduced: "NPQQAAAA9" }
    ];

    for (let i = 0; i < precisions.length; i++) {
        expect(increasePrecision(precisions[i].areaCode)).toBe(precisions[i].reduced);
    }
});

test("setPrecision() can fail on unknown precision", () => {
    expect(() => {
        setPrecision("NPHTQORL9XKP", 12);
    }).toThrowError(/be one of/);
});

test("setPrecision() can succeed with same precision", () => {
    expect(setPrecision("NPHTQORL9", 8)).toBe("NPHTQORL9");
});
