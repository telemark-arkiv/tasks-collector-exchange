'use strict'

var envs = process.env
var pkg = require('../package.json')
var getTasks = require('./getTasksExchange')

module.exports = function (options) {
  var seneca = this

  seneca.add('cmd:collect-tasks, type:user', getTasksFromExchange)

  return {
    name: envs.TASKS_COLLECTOR_EXCHANGE_TAG || 'tasks-collector-exchange'
  }
}

function getTasksFromExchange (args, callback) {
  var seneca = this
  var user = args.user
  var result = ''
  getTasks(user, function (err, data) {
    if (err) {
      result = err
    } else {
      result = {
        system: pkg.name,
        user: user,
        data: data
      }
    }
  })

  seneca.act({info: 'tasks', type: 'user', data: result})

  callback(null, {ok: true})
}
