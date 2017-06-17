'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

router.param('id', (req, res, next, val) => {
  const regex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  const err = regex.test(val) ? null : 'route';
  
  next(err);
});

router.get('/', require('./list'));
router.get('/:id', require('./get'));
router.post('/', require('./create'));

module.exports = Object.freeze(router);
