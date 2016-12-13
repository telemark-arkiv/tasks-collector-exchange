'use strict'

var Seneca = require('seneca')
var Mesh = require('seneca-mesh')
var envs = process.env
var Exchange = require('./lib/exchange')

var options = {
  seneca: {
    log: 'silent',
    tag: envs.TASKS_COLLECTOR_EXCHANGE_TAG || 'tasks-collector-exchange'
  },
  mesh: {
    auto: true,
    listen: [
      {pin: 'cmd:collect-tasks, type:user', model: 'observe'}
    ]
  },
  exchange: {
    url: envs.TASKS_COLLECTOR_EXCHANGE_URL || 'http://www.exchange.no'
  },
  isolated: {
    host: envs.TASKS_COLLECTOR_EXCHANGE_HOST || 'localhost',
    port: envs.TASKS_COLLECTOR_EXCHANGE_PORT || '8000'
  }
}
var Service = Seneca(options.seneca)

if (envs.TASKS_COLLECTOR_EXCHANGE_ISOLATED) {
  Service.listen(options.isolated)
} else {
  Service.use(Mesh, options.mesh)
}

Service.use(Exchange, options.exchange)
