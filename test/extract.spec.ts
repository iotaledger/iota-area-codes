import { extract } from "../src/extract";

test("extract() can extract just iac", () => {
    expect(extract("NPHTQORL9XKP999999999")).toBe("NPHTQORL9XKP");
});

test("extract() can fail to extract invalid code", () => {
    expect(extract("NPBAAAAA9")).toBe(undefined);
});
