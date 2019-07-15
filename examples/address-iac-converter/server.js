const express = require('express')
const { addressToIac, iacToAddress } =  require('./lib')
const app = express()
const port = 3030

app.get('/address', async (req, res) => {
  //Example call: http://localhost:3030/address?iac=NPHTRPFM9FF
  const iac = req.query.iac
  const address = await iacToAddress(iac)
  res.send(address)
})
app.get('/iac', async (req, res) => {
  //Example call: http://localhost:3030/iac?address=Strassburger+Str.+55,+10405+Berlin,+Germany
  const address = req.query.address
  const iac = await addressToIac(address)
  res.send(iac)
})


app.listen(port, () => console.log(`IOTA GeoSERVICE listening on port ${port}!`))
