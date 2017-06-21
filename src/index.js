'use strict';

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configuration = require('./configuration');
const app = express();

// Middlewares
app.use(cors(configuration.cors));
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json(configuration.json));
app.use(bodyParser.urlencoded(configuration.urlencoded));
app.use('/', require('./routes'));
app.use('*', (req, res) => res.sendStatus(404));
app.use((err, req, res, next) => res.status(err.status || 500).send(err));

// MongoDB
mongoose.Promise = global.Promise;
connectToMongo(250)
process.on('SIGTERM', () => mongoose.connection.close(() => process.exit(0)));

module.exports = app;

function connectToMongo (delay) {
  mongoose.connect(configuration.mongo.uri, configuration.mongo.options)
    .then(() => console.info('Connected to MongoDB.'))
    .catch(() => {
      delay *= 2;
      console.error(`Connection to MongoDB failed, retrying in ${delay} ms.`)
      setTimeout(() => connectToMongo(delay), delay)
    })
  ;
}
