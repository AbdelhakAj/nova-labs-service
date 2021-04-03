const express = require('express')
const mongoose = require('mongoose')
const helmet = require("helmet")
const morgan = require('morgan')

const controllers = require('./controllers')

// I didn't use env variables for the sake of simplicity
const DATABASE_URL = 'mongodb://localhost/'
const PORT = 3000
const HOST = 'localhost'

const app = express()
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true, autoIndex: true })
const db = mongoose.connection

db.on('error', (error) => console.error('[index] ' + error))
db.once('open', () => console.log('[index] Connected to Database'))

app.use(helmet());
app.use(express.json())
app.use(morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms'));

app.use('/', controllers)

const server = app.listen(PORT, HOST, () => console.log('[index] Express server is running at ' + HOST + ':' + PORT + ' / pid: ' + process.pid))

const serverGracefulShutdownHandler = () => {
  console.log("[index] Stopping server on port " + PORT);

  server.close(
    function (error) {
      if (error) {
        console.error("[index] Problem with server graceful shutdown!", error);
        process.exit(1);
      } else {
        console.log("[index] Server on port " + PORT + " stopped gracefully.");
        process.exit(1);
      }
    }
  )
}

process.on("SIGTERM", serverGracefulShutdownHandler);
process.on("SIGINT", serverGracefulShutdownHandler);
process.on("SIGHUP", serverGracefulShutdownHandler);
process.on("message",
  function (msg) {
    if (msg === "shutdown") {
      serverGracefulShutdownHandler();
    }
  }
);