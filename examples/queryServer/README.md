# IAC Query Server

The IAC server stores transactions with IAC codes so they can be queried back at a later date using wilcard searches.

## Functions

The IAC server has four main functions:

- Ingest ZMQ streams from compatible IRI nodes
- Filter relevant transactions and store them for retrieval
- Serve queries via a HTTP API
- Clean the database of old transactions, dependant on TX volume & server specs.

## Technology

The IAC server relies on the following technologies:

- Cassandra DB - NoSQL Keystore with Compound Primary keys for fast querying
- ZeroMQ - Message queing protocol utilised by the IRI nodes
- Micro - Simple HTTP server to handle queries

## Database Structure

The current database schema for the database is as follows:

```cassandra
CREATE KEYSPACE txDB WITH REPLICATION = {
'class' : 'SimpleStrategy',
'replication_factor' : 1
};

CREATE TABLE txDB.transaction (
    pair0 varchar,
    pair1 varchar,
    pair2 varchar,
    pair3 varchar,
    pair4 varchar,
    tx_id varchar,
    iac varchar,
	PRIMARY KEY ((pair0), pair1, pair2, pair3, tx_id)
)
```

The IAC code is split up into its component pairs when it's entered into the database. Then the first four pairs are used to create the compound primary key. This is imporant as it allows for the data to be efficently stored and retrieved.

This format is directly analogous to the common `country > state > city, suburb > street` compund primary key format.

### Setting up a server

Pull and start running your Cassandra server:

```bash
docker run --name cassandraDb -d -p 7199:7199 -p 7000:7000 -p 9042:9042 -p 9160:9160 -p 7001:7001 cassandra:3.11
```

Clone this repo and install deps:

```bash
npm i
```

Once we have all the dependencies installed, lets modify our `.env` file:

```bash
cp .env.example .env

vi .env
```

Then lets start the server:

```
yarn start
```

Finally you need to navigate your browser this URL to initalise the schema:

```bash
localhost:3000/initDatabase
```

### Todo List

- [ ] Basic HTTP API
  - [x] Map all internal functions to the HTTP API
  - [ ] Rate Limit the API
  - [x] Add CORS
  - [ ] Basic Auth?
- [ ] ZMQ Listener
  - [x] Basic ZMQ code
  - [x] Filtering for IAC tags
  - [x] Batched storage to Cassandra
  - [ ] Start/Stop ZMQ listener
- [x] Cassandra DB
  - [x] Initalise database (Keyspace & Table)
  - [x] Destroy database
  - [x] Fetch all transactions
  - [x] Query using partial IAC codes
