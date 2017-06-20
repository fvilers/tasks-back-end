'use strict';

const configuration = {
  cors : {
    origin: new RegExp(process.env.CORS_ORIGIN || "http://localhost:4200")
  },
  json: {
    limit: process.env.JSON_LIMIT || "2mb"
  },
  queue: {
    prefix: "queue",
    redis: {
      port: 6379,
      host: process.env.REDIS_HOST || "localhost"
    }
  },
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost/tasks",
    options: {
      server: {
        auto_reconnect: true
      }
    }
  },
  urlencoded: {
    extended: false
  }
};

module.exports = Object.freeze(configuration);
