'use strict'

const envs = process.env
const pkg = require('../package.json')
const getTasks = require('./getTasksExchange')

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
  console.log(`tasks-collector-exchange: collecting tasks for ${user}`)
  getTasks(user, function (err, data) {
    if (err) {
      callback(err)
    } else {
      var result = {
        system: pkg.name,
        version: pkg.version,
        user: args.user,
        data: data
      }
      seneca.act({info: 'tasks', type: 'user', data: result})
      callback(null, {ok: true})
    }
  })
}
