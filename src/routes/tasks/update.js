'use strict';

const createError = require('http-errors');
const kue = require('kue');
const Task = require('../../models/task');
const updateOptions = {
  new: true,
  runValidators: true
};

function updateTask (req, res, next) {
  const query = {
    _id: req.params.id,
    userId: req.params.userId
  };

  Task.findOneAndUpdate(query, req.body, updateOptions)
    .then(sendEvent)
    .then(sendResponse)
    .catch(onError)
  ;

  function sendEvent (task) {
    return new Promise((fulfill, reject) => {
      const queue = kue.createQueue();
      const job = queue.create('taskUpdated', task.toObject());

      job.save(err => err ? reject(err) : fulfill(task));
    });
  }

  function sendResponse (task) {
    if (!task) {
      return next(createError.NotFound());
    }

    res.status(200).send(task.toObject());
  }

  function onError (err) {
    if (err && err.name === 'ValidationError') {
      return next(new createError.BadRequest(err));
    }

    next(err);
  }
}

module.exports = updateTask;
