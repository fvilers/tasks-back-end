'use strict';

const createError = require('http-errors');
const Task = require('../../models/task');

function listTasks (req, res, next) {
  const query = { userId: req.params.userId };

  Task.find(query)
    .then(sendResponse)
    .catch(next)
  ;

  function sendResponse (tasks) {
    const response = tasks.map(task => task.toObject());

    res.status(200).json(response);
  }
}

module.exports = listTasks;
