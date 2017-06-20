'use strict';

const createError = require('http-errors');
const kue = require('kue');
const Task = require('../../models/task');

function removeTask (req, res, next) {
  const query = {
    _id: req.params.id,
    userId: req.params.userId
  };

  Task.findOneAndRemove(query)
    .then(sendEvent)
    .then(sendResponse)
    .catch(next)
  ;

  function sendEvent (task) {
    return new Promise((fulfill, reject) => {
      const queue = kue.createQueue();
      const job = queue.create('taskRemoved', task);

      job.save(err => err ? reject(err) : fulfill(task));
    });
  }

  function sendResponse (task) {
    if (!task) {
      return next(createError.NotFound());
    }

    res.sendStatus(204);
  }
}

module.exports = removeTask;
