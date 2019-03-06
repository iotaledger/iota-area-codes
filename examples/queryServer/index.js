require('dotenv').config()
const { json, send } = require('micro')
const cors = require('micro-cors')({ allowMethods: ['OPTIONS', 'GET', 'POST'] })

/// Pull in helpers
const {
  initCassandra,
  fetchTransactions,
  queryTransactions
} = require('./components/db')
const zmq = require('./components/zmq')

module.exports = cors(async (req, res) => {
  let response
  try {
    switch (req.url) {
      //// Un-comment when testing
      // case '/initDatabase':
      //   initCassandra()
      //   response = { message: 'Initalizing Cassandra db' }
      //   break
      // case '/startSubscribing':
      //   subscribeToZMQ()
      //   response = { message: 'Subscribing to ZMQ' }
      //   break
      case '/fetch':
        response = await fetchTransactions()
        break
      case '/query':
        const js = await json(req)
        response = await queryTransactions(js.iac)
        break
      default:
        return send(res, 404, 'Not found')
    }
  } catch (err) {
    return send(res, 200, { success: false, message: err.message })
  }
  return send(res, 200, response)
});
