'use strict';

const createError = require('http-errors');
const kue = require('kue');
const Task = require('../../models/task');

function createTask (req, res, next) {
  const task = new Task(req.body);
  task.userId = req.params.userId;

  task.save()
    .then(sendEvent)
    .then(sendResponse)
    .catch(onError)
  ;

  function sendEvent (task) {
    return new Promise((fulfill, reject) => {
      const queue = kue.createQueue();
      const job = queue.create('taskCreated', task.toObject());

      job.save(err => err ? reject(err) : fulfill(task));
    });
  }

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
