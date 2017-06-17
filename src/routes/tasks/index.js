'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', require('./list'));
router.post('/', require('./create'));

module.exports = Object.freeze(router);
