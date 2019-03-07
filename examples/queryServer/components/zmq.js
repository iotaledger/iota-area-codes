const { extract } = require('@iota/area-codes')
const { storeTransaction } = require('./db')

let zmq = require('zeromq')
let sock = zmq.socket('sub')

// Connect to the devnet node's ZMQ port
console.log('Connecting to ZMQ')
sock.connect(process.env.ZMQ_URL)

sock.subscribe('tx_trytes')

sock.on('message', async msg => {
  const data = msg.toString().split(' ') // Split to get topic & data
  const tx_id = data[2] // TX Hash
  const tag = data[1].slice(2592, 2619) // Extract tag
  const iac = extract(tag) // Check that the tag is correct

  // Qualify TAG
  if (iac) {
    console.log('IAC:', iac)
    console.log('Tx Hash:', tx_id)
    await storeTransaction([{ tx_id, iac }])
  }
})

module.exports = {}
