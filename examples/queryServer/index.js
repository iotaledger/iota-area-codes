require('dotenv').config()
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const {
  initCassandra,
  fetchTransactions,
  queryTransactions
} = require('./components/db')
const zmq = require('./components/zmq')

console.log(process.env.ZMQ_URL);
console.log(process.env.DB_URL);

const app = express();

const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["content-type", "authorization"]
};

app.use(cors(corsConfig));

app.use(bodyParser.json());

//// Un-comment when testing
// app.get("/initDatabase", async (req, res) => {
//   initCassandra()
//   res.setHeader("Content-Type", "application/json");
//   res.send(JSON.stringify({ message: 'Initalizing Cassandra db' }));
//   res.end();
// });

app.get("/fetch", async (req, res) => {
  const response = await fetchTransactions()

  res.setHeader("Content-Type", "application/json");
  res.send(response);
  res.end();
})

app.post("/query", async (req, res) => {
  const response = await queryTransactions(req.body.iac)

  res.setHeader("Content-Type", "application/json");
  res.send(response);
  res.end();
})

app.listen(3000, err => {
    if (err) {
        throw err;
    }
    console.log(`Started API Server`);
    zmq.startZMQ();
});
