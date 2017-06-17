'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', require('./list'));

module.exports = Object.freeze(router);
