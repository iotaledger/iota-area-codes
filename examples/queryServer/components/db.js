const cassandra = require('cassandra-driver')
const client = new cassandra.Client({
  contactPoints: [process.env.DB_URL],
  localDataCenter: 'datacenter1'
})
const { isValidPartial } = require('@iota/area-codes')

// INIT DB
const initKeyspace = async () => {
  // Functions
  const queries = `CREATE KEYSPACE txDB WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`
  try {
    return await client.execute(queries)
  } catch (e) {
    return console.error(e)
  }
}

const initTable = async () => {
  // Functions
  const queries = `CREATE TABLE txDB.transaction (pair0 varchar, pair1 varchar, pair2 varchar, pair3 varchar, pair4 varchar, tx_id varchar, iac varchar, PRIMARY KEY ((pair0), pair1, pair2, pair3, tx_id))`
  try {
    return await client.execute(queries)
  } catch (e) {
    return console.error(e)
  }
}
const dropSpace = async () => {
  // Functions
  const queries = `DROP KEYSPACE txDB`
  try {
    return await client.execute(queries)
  } catch (e) {
    return console.error(e)
  }
}

const initCassandra = async () => {
  try {
    await dropSpace()
  } catch (e) {}
  try {
    await initKeyspace()
    await initTable()
    return true
  } catch (e) {
    return { error: 'Failed to init db' }
  }
}

const storeTransaction = async array => {
  const queries = array.map(({ tx_id, iac }) => {
    const query = `INSERT INTO txDB.transaction (tx_id, iac, pair0, pair1, pair2, pair3, pair4) VALUES (?,?,?,?,?,?,?);`
    const params = [
      tx_id,
      iac,
      iac.slice(0, 2),
      iac.slice(2, 4),
      iac.slice(4, 6),
      iac.slice(6, 8),
      iac.slice(9, 11)
    ]
    return { query, params }
  })
  try {
    return await client.batch(queries, { prepare: true })
  } catch (e) {
    return Error(e)
  }
}

const fetchTransactions = async () => {
  let query = `SELECT tx_id, iac FROM txDB.transaction`
  let res = await client.execute(query)
  delete res.info
  return res
}

const queryTransactions = async iac => {
  if (!isValidPartial(iac)) {
    throw new Error('The IOTA Area Code must be a full partial with 9 characters')
  }
  const iacArray = iac.split('')
  const pairs = iacArray.indexOf('A') / 2

  // Beginning query
  let query = `SELECT tx_id, iac FROM txDB.transaction WHERE`

  // Construct query
  Array(pairs)
    .fill()
    .map((_, i) => {
      query = query + ` pair${i} = '${iacArray[i * 2] + iacArray[i * 2 + 1]}'`
      if (pairs - 1 != i) {
        query = query + ' AND'
      } else {
        query = query + ';'
      }
    })
  console.log(query)
  let res = await client.execute(query)
  delete res.info
  return {
    success: true,
    items: res.rows
  }
}

module.exports = {
  initCassandra,
  storeTransaction,
  fetchTransactions,
  queryTransactions
}
