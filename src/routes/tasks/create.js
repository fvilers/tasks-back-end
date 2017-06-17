'use strict';

const createError = require('http-errors');
const Task = require('../../models/task');

function createTask (req, res, next) {
  const task = new Task(req.body);
  task.userId = req.params.userId;

  task.save()
    .then(sendResponse)
    .catch(onError)
  ;

  function sendResponse (task) {
    res.status(201).json(task.toObject());
  }

  function onError (err) {
    if (err && err.name === 'ValidationError') {
      return next(new createError.BadRequest(err));
    }

    next(err);
  }
}

module.exports = createTask;
