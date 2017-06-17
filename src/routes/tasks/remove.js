'use strict';

const createError = require('http-errors');
const Task = require('../../models/task');

function removeTask (req, res, next) {
  const query = {
    _id: req.params.id,
    userId: req.params.userId
  };

  Task.findOneAndRemove(query)
    .then(sendResponse)
    .catch(next)
  ;

  function sendResponse (task) {
    if (!task) {
      return next(createError.NotFound());
    }

    res.sendStatus(204);
  }
}

module.exports = removeTask;
