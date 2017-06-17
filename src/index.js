'use strict';

const express = require('express');
const compression = require('compression');
const helmet = require('compression');
const app = express();

// Middlewares
app.use(compression());
app.use(helmet());
app.use('*', (req, res) => res.sendStatus(404));
app.use((err, req, res, next) => res.status(err.status || 500).send(err));

module.exports = app;
