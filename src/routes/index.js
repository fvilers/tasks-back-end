'use strict';

const express = require('express');
const router = express.Router();

router.param('userId', (req, res, next, val) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const err = regex.test(val) ? null : 'route';
  
  next(err);
});

router.use('/:userId/tasks', require('./tasks'));

module.exports = Object.freeze(router);
