'use strict'

const envs = process.env
const tag = envs.TASKS_COLLECTOR_EXCHANGE_TAG || 'tasks-collector-exchange'
const pkg = require('../package.json')
const getTasks = require('./getTasksExchange')
const logTime = require('./log-time')

module.exports = function (options) {
  const seneca = this

  seneca.add('cmd: collect-tasks, type: user', getTasksFromExchange)

  return tag
}

function getTasksFromExchange (args, callback) {
  const seneca = this
  const user = args.user

  console.log(`${tag} - ${logTime()}: collecting tasks for ${user}`)

  getTasks(user, (error, data) => {
    if (error) {
      console.log(`${tag} - ${logTime()}: error collecting tasks for ${user} - ${JSON.stringify(error)}`)
      const result = {
        system: pkg.name,
        version: pkg.version,
        user: args.user,
        data: []
      }
      callback(null, {ok: false})
      seneca.act({info: 'tasks', type: 'user', data: result})
    } else {
      console.log(`${tag} - ${logTime()}: finished collecting tasks for ${user}`)
      const result = {
        system: pkg.name,
        version: pkg.version,
        user: args.user,
        data: data
      }
      callback(null, {ok: true})
      seneca.act({info: 'tasks', type: 'user', data: result})
    }
  })
}
