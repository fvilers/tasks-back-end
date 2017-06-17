'use strict';

const mongoose = require('mongoose');
const model = mongoose.model('Task', require('./schemas/task'));

module.exports = Object.freeze(model);
