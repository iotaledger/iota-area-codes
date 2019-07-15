const axios = require('axios');
const iotaAreaCodes = require('@iota/area-codes');

const apiKey = 'xxxxxxxxxxxxxxxxxxx'// please generate it from Google Cloud

async function iacToAddress(iac) {
  //iac to lat long
  const locObj = iotaAreaCodes.decode(iac);
  // latitude longitude
  let res = null
  let address = null
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locObj.latitude},${locObj.longitude}&key=${apiKey}`
  const opts = {
    method: 'GET',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    url,
  };
  try {
    res = await axios(opts)
    address = res.data.results[0].formatted_address
  } catch(e) {
    console.log('error:', e)
  }

  return address
}

async function addressToIac(address) {
  let res = null
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  const opts = {
    method: 'GET',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    url,
  };

  let iac = null
  try {
    res = await axios(opts)
    const formattedAddress = res.data.results[0].formatted_address
    const locationObj = res.data.results[0].geometry.location
    iac = iotaAreaCodes.encode(locationObj.lat, locationObj.lng);
  } catch(e) {
    console.log('error:', e)
  }
  return iac
}


module.exports.iacToAddress = iacToAddress

module.exports.addressToIac = addressToIac
