'use strict';

const express = require('express');
const compression = require('compression');
const helmet = require('compression');
const mongoose = require('mongoose');
const configuration = require('./configuration');
const app = express();

// Middlewares
app.use(compression());
app.use(helmet());
app.use('*', (req, res) => res.sendStatus(404));
app.use((err, req, res, next) => res.status(err.status || 500).send(err));

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(configuration.mongo.uri, configuration.mongo.options);
process.on('SIGTERM', () => mongoose.connection.close(() => process.exit(0)));

module.exports = app;
