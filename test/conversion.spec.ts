import { CodePrecision } from "../src/codePrecision";
import { decode, encode, fromOpenLocationCode, toOpenLocationCode } from "../src/conversion";

const testData: any[] = [
    { iac: "NPHTQORL9XKP", olc: "9F4MGCH7+R6F", latitude: 52.529562, longitude: 13.413047 },
    { iac: "LPQHNVAA9", olc: "7FG49Q00+", latitude: 20.375, longitude: 2.775 },
    { iac: "LPQHNVOS9FW", olc: "7FG49QCJ+2V", latitude: 20.3700625, longitude: 2.7821875 },
    { iac: "LPQHNVOS9FWZ", olc: "7FG49QCJ+2VX", latitude: 20.3701125, longitude: 2.782234375 },
    { iac: "LPQHNVOS9FWZQS", olc: "7FG49QCJ+2VXGJ", latitude: 20.3701135, longitude: 2.78223535156 },
    { iac: "MPWOFFFF9FF", olc: "8FVC2222+22", latitude: 47.0000625, longitude: 8.0000625 },
    { iac: "HWOUUVQU9VN", olc: "4VCPPQGP+Q9", latitude: -41.2730625, longitude: 174.7859375 },
    { iac: "KFQFAAAA9", olc: "62G20000+", latitude: 0.5, longitude: -179.5 },
    { iac: "FFFFAAAA9", olc: "22220000+", latitude: -89.5, longitude: -179.5 },
    { iac: "LPQHAAAA9", olc: "7FG40000+", latitude: 20.5, longitude: 2.5 },
    { iac: "FFFFFFFF9FF", olc: "22222222+22", latitude: -89.9999375, longitude: -179.9999375 },
    { iac: "KWQZAAAA9", olc: "6VGX0000+", latitude: 0.5, longitude: 179.5 },
    { iac: "KPRGFFFF9FFF", olc: "6FH32222+222", latitude: 1, longitude: 1 },
    { iac: "OPZGAAAA9", olc: "CFX30000+", latitude: 90, longitude: 1 },
    { iac: "OPZGAAAA9", olc: "CFX30000+", latitude: 92, longitude: 1 },
    { iac: "KFRFAAAA9", olc: "62H20000+", latitude: 1, longitude: 180 },
    { iac: "KFRGAAAA9", olc: "62H30000+", latitude: 1, longitude: 181 },
    { iac: "OPZGZFZF9ZF", olc: "CFX3X2X2+X2", latitude: 90, longitude: 1 }
];

test("encodeIac() returns correct IAC", () => {
    for (let i = 0; i < testData.length; i++) {
        let codeLength = testData[i].olc.length - 1;
        if (testData[i].olc.indexOf("0") !== -1) {
            codeLength = testData[i].olc.indexOf("0");
        }
        const iac = encode(testData[i].latitude, testData[i].longitude, codeLength === CodePrecision.NORMAL ? undefined : codeLength);
        expect(iac).toBe(testData[i].iac);
        const olc = toOpenLocationCode(iac);
        expect(olc).toBe(testData[i].olc);
    }
});

test("encodeIac() fails when previcion too short", () => {
    expect(() => {
        encode(0, 0, 1);
    }).toThrowError(/not valid/);
});

test("decodeIac() returns correct CodeArea", () => {
    const codeArea = decode("NPHTQORL9XKP");
    expect(codeArea.latitude.toFixed(6)).toBe("52.529562");
    expect(codeArea.longitude.toFixed(6)).toBe("13.413047");
    expect(codeArea.codePrecision).toBe(11);
    expect(codeArea.latitudeLow.toFixed(6)).toBe("52.529550");
    expect(codeArea.latitudeHigh.toFixed(6)).toBe("52.529575");
    expect(codeArea.longitudeLow.toFixed(6)).toBe("13.413031");
    expect(codeArea.longitudeHigh.toFixed(6)).toBe("13.413063");
});

test("toOpenLocationCode() converts from iac to olc correctly", () => {
    for (let i = 0; i < testData.length; i++) {
        const olc = toOpenLocationCode(testData[i].iac);
        expect(olc).toBe(testData[i].olc);
    }
});

test("toOpenLocationCode() converts from iac to olc with failure", () => {
    expect(() => {
        toOpenLocationCode("000");
    }).toThrowError(/not valid/);
});

test("fromOpenLocationCode() converts from olc to iac correctly", () => {
    for (let i = 0; i < testData.length; i++) {
        const iac = fromOpenLocationCode(testData[i].olc);
        expect(iac).toBe(testData[i].iac);
    }
});

test("fromOpenLocationCode() converts from olc to iac with failure", () => {
    expect(() => {
        fromOpenLocationCode("999");
    }).toThrowError(/not valid/);
});
