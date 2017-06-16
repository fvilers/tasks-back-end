'use strict';

const express = require('express');
const app = express();

// Middlewares
app.use('*', (req, res) => res.sendStatus(404));
app.use((err, req, res, next) => res.status(err.status || 500).send(err));

module.exports = app;
