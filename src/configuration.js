'use strict';

const configuration = {
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost/tasks",
    options: {
      server: {
        auto_reconnect: true
      }
    }
  }
};

module.exports = Object.freeze(configuration);
