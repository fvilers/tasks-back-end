'use strict';

const mongoose = require('mongoose');
const options = require('./options');
const schema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    type: String
  },
  done: {
    default: false,
    type: Boolean
  },
  listId: {
    index: true,
    required: true,
    type: String
  }
}, options);

module.exports = schema;
