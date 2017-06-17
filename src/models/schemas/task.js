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
  userId: {
    index: true,
    required: true,
    type: String,
    validate: {
      validator: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test
    }
  }
}, options);

module.exports = schema;
