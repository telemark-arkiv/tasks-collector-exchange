const ews = require('ews-javascript-api')
const ntlmXHR = require('./ntlmXHRApi')
const config = require('../config')
const ntlmXHRApi = new ntlmXHR.NtlmXHRApi(config.username, config.password)

// create ExchangeService object
module.exports = (username, callback) => {
  const upn = username + '@' + config.domain
  const exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013)
  exch.XHRApi = ntlmXHRApi
  exch.Credentials = new ews.ExchangeCredentials(config.username, config.password)
  exch.ImpersonatedUserId = new ews.ImpersonatedUserId(ews.ConnectingIdType.PrincipalName, upn)
  ews.EwsLogging.DebugLogEnabled = false // turn off logging

  // set ews endpoint url to use
  exch.Url = new ews.Uri(config.url) // you can also use exch.AutodiscoverUrl

  const folder = new ews.FolderId(ews.WellKnownFolderName.Tasks)
  const sf = new ews.SearchFilter.IsNotEqualTo(ews.TaskSchema.IsComplete, true)
  const view = new ews.ItemView(config.tasksLimit)

  exch.FindItems(folder, sf, view)
    .then((response) => {
      let countTasks = response.items.length
      console.log(`tasks-collector-exchange: collected tasks for ${username} - found ${countTasks}`)
      if (countTasks === 0) {
        return callback(null, [])
      }
      if (response.items.length === config.tasksLimit) {
        countTasks = '<' + config.tasksLimit
      }
      const item = [
        {
          systemid: 'tasks-exchange',
          timestamp: new Date().getTime(),
          title: 'Ugjorte oppgaver (' + countTasks + ')',
          url: config.tasksUrl
        }
      ]
      return callback(null, item)
    }, (err) => {
      console.log(`tasks-collector-exchange: error in tasks collector for ${username} - ${JSON.stringify(err)}`)
      return callback(null, [])
    }
  )
}
