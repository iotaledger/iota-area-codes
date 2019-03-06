import { isValid, isValidPartial } from "../src/validation";

test("isValid() can validate iac values", () => {
    const validations = [
        { value: undefined, isValid: false },
        { value: null, isValid: false },
        { value: false, isValid: false },
        { value: true, isValid: false },
        { value: 1, isValid: false },
        { value: "", isValid: false },
        { value: "0", isValid: false },
        { value: "9", isValid: false },
        { value: "NPHTQORL9XL", isValid: true },
        { value: "NPHTQORL9", isValid: true },
        { value: "NPHTQORL", isValid: false }
    ];

    for (let i = 0; i < validations.length; i++) {
        expect(isValid(<any>validations[i].value)).toBe(validations[i].isValid);
    }
});

test("isValidPartial() can validate iac values", () => {
    const validations = [
        { value: undefined, isValid: false },
        { value: null, isValid: false },
        { value: false, isValid: false },
        { value: true, isValid: false },
        { value: 1, isValid: false },
        { value: "", isValid: false },
        { value: "0", isValid: false },
        { value: "9", isValid: false },
        { value: "NPHTQORL9XL", isValid: false },
        { value: "NPHTQORL9", isValid: false },
        { value: "NPHTQORL", isValid: false },
        { value: "AA", isValid: false },
        { value: "NPHTQOAA", isValid: true },
        { value: "NPHTQOA", isValid: false }
    ];

    for (let i = 0; i < validations.length; i++) {
        expect(isValidPartial(<any>validations[i].value)).toBe(validations[i].isValid);
    }
});
