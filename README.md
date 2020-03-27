<h2 align="center">Geo-location tags for IOTA transactions</h2>

<p align="center">
  <a href="https://discord.iota.org/" style="text-decoration:none;"><img src="https://img.shields.io/badge/Discord-9cf.svg?logo=discord" alt="Discord"></a>
    <a href="https://iota.stackexchange.com/" style="text-decoration:none;"><img src="https://img.shields.io/badge/StackExchange-9cf.svg?logo=stackexchange" alt="StackExchange"></a>
    <a href="https://github.com/iotaledger/iota-area-codes/blob/master/LICENSE" style="text-decoration:none;"><img src="https://img.shields.io/github/license/iotaledger/iota-area-codes.svg" alt="MIT license"></a>
</p>
      
<p align="center">
  <a href="#about">About</a> ◈
  <a href="#prerequisites">Prerequisites</a> ◈
  <a href="#installation">Installation</a> ◈
  <a href="#getting-started">Getting started</a> ◈
  <a href="#api-reference">API reference</a> ◈
  <a href="#supporting-the-project">Supporting the project</a> ◈
  <a href="#joining-the-discussion">Joining the discussion</a> 
</p>

---

## About

IOTA area codes (IAC) are a proposed standard for tagging IOTA transactions with a geo-location, which allows you to be filter them by location.

IACs are a clone of [Open Location Codes](https://en.wikipedia.org/wiki/Open_Location_Code) with some minor changes to make them compatible with tryte encoding:
- The numbers and letters that make up an IAC include the following: `FGHJKLMNOPQRSTUVXWYZ`
- The separator that comes after the eighth tryte in an IAC is a `9` instead of a `+`
- The `A` tryte is used for padding IACs instead of a `0`

A demonstration of the API is available [here](https://iota-poc-area-codes.dag.sh).

See a more [detailed explanation of IACs](./docs/iota-area-codes.md).

This is beta software, so there may be performance and stability issues.
Please report any issues in our [issue tracker](https://github.com/iotaledger/iota-area-codes/issues/new).

## Prerequisites

To use IACs in your own applications, you need [Node.js](https://nodejs.org/en/download/) installed on your device.

To check if you have Node.js installed, run the following command:

```bash
node -v
```

If Node.js is installed, you should see the version that's installed.

## Installation

To install this package, use one of the following commands:


- `npm install @iota/area-codes`


- `yarn add @iota/area-codes`

## Getting started

For a tutorial on getting started with IACs, see our [documentation portal](https://docs.iota.org/docs/utils/0.1/official/iota-area-codes/overview).

To jump in now, see the following code sample:

```js
const iotaAreaCodes = require('@iota/area-codes');

const iac = iotaAreaCodes.encode(52.529562, 13.413047);
console.log("IOTA Area Code", iac);

const iacHighPrecision = iotaAreaCodes.encode(52.529562, 13.413047, iotaAreaCodes.CodePrecision.EXTRA);
console.log("IOTA Area Code High Precision", iacHighPrecision);

const codeArea = iotaAreaCodes.decode('NPHTQORL9XKP');
console.log("IOTA Code Area", codeArea);

const olc = iotaAreaCodes.toOpenLocationCode('NPHTQORL9XKP');
console.log("Open Location Code", olc);

const iac2 = iotaAreaCodes.fromOpenLocationCode('X4HM+MM');
console.log("IOTA Area Code", iac2);

const isValid1 = iotaAreaCodes.isValid('JAHAS0');
console.log("isValid1", isValid1);

const isValid2 = iotaAreaCodes.isValid('NPHTQORL9XKP');
console.log("isValid2", isValid2);

const isValidPartial1 = iotaAreaCodes.isValidPartial('JAHAS');
console.log("isValidPartial1", isValidPartial1);

const isValidPartial2 = iotaAreaCodes.isValidPartial('NPAAAAAA9');
console.log("isValidPartial2", isValidPartial2);

const extracted = iotaAreaCodes.extract('NPHTQORL9XKP999999999');
console.log("extracted", extracted);

const dimensions = iotaAreaCodes.getPrecisionDimensions(4);
console.log("dimensions", dimensions);

const increasePrecision1 = iotaAreaCodes.increasePrecision('NPHTQORL9');
console.log("increasePrecision1", increasePrecision1);

const decreasePrecision1 = iotaAreaCodes.decreasePrecision('NPHTQORL9');
console.log("decreasePrecision1", decreasePrecision1);

const setPrecision1 = iotaAreaCodes.setPrecision('NPHTQORL9', 4);
console.log("setPrecision", setPrecision1);
```

Will output:

```shell
IOTA Area Code NPHTQORL9XK
IOTA Area Code High Precision NPHTQORL9XKP
IOTA Code Area {
  latitude: 52.52956250000001,
  longitude: 13.413046874999981,
  codePrecision: 11,
  latitudeLow: 52.529550000000015,
  latitudeHigh: 52.529575000000015,
  longitudeLow: 13.413031249999982,
  longitudeHigh: 13.413062499999983
}
Open Location Code 9F4MGCH7+R6F
IOTA Area Code ZHRT9TT
isValid1 false
isValid2 true
isValidPartial1 false
isValidPartial2 true
extracted NPHTQORL9XKP
dimensions {
  blocksSizeDegrees: 1,
  blocksSizeDegreesFormatted: "1°",
  sizeMetres: 110000,
  sizeMetresFormatted: "110km"
}
increasePrecision1 NPHTQORL9QP
decreasePrecision1 NPHTQOAA9
setPrecision NPHTAAAA9
```

## API Reference

See the [JavaScript API reference](./docs/api.md).

## Supporting the project

If you want to contribute, consider submitting a [bug report](https://github.com/iotaledger/iota-area-codes/issues/new), [feature request](https://github.com/iotaledger/iota-area-codes/issues/new) or a [pull request](https://github.com/iotaledger/iota-area-codes/pulls/).

See our [contributing guidelines](.github/CONTRIBUTING.md) for more information.

## Joining the discussion

If you want to get involved in the community, need help with getting set up, have any issues or just want to discuss IOTA, Distributed Registry Technology (DRT), and IoT with other people, feel free to join our [Discord](https://discord.iota.org/).