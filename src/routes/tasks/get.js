'use strict';

const createError = require('http-errors');
const Task = require('../../models/task');

function getTask (req, res, next) {
  const query = {
    _id: req.params.id,
    userId: req.params.userId
  }
  
  Task.findOne(query)
    .then(sendResponse)
    .catch(next)
  ;

  function sendResponse (task) {
    if (!task) {
      return next(createError.NotFound());
    }

    res.status(200).send(task.toObject());
  }
}

module.exports = getTask;
