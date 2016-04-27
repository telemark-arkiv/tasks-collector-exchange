'use strict'

var envs = process.env

var config = {
  url: envs.EWS_URL || 'https://epost.vfk.no/ews/Exchange.asmx',
  username: envs.EWS_USERNAME || 'domain\\username', // Must have double slash between domain and user
  password: envs.EWS_PASSWORD || 'password',
  tasksUrl: envs.EWS_TASKS_URL || 'https://epost.vfk.no/owa/#path=/tasks',
  tasks: envs.EWS_TASKS || 20 // number of uncompleted tasks to get
}

module.exports = config
