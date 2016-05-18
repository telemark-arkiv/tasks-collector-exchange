'use strict'

var envs = process.env

var config = {
  url: envs.EWS_TASKS_URL || 'https://epost.vfk.no/ews/Exchange.asmx',
  username: envs.EWS_TASKS_USERNAME || 'domain\\username', // Must have double slash between domain and user
  password: envs.EWS_TASKS_PASSWORD || 'password',
  domain: envs.EWS_TASKS_DOMAIN || 'skole.t-fk.no',
  tasksUrl: envs.EWS_TASKS_OWA_URL || 'https://epost.vfk.no/owa/#path=/tasks',
  tasksLimit: parseInt(envs.EWS_TASKS_LIMIT) || 20 // number of uncompleted tasks to get
}

module.exports = config
