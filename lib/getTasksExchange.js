var ews = require('ews-javascript-api')
var ntlmXHR = require('./ntlmXHRApi')
var config = require('../config')
var ntlmXHRApi = new ntlmXHR.NtlmXHRApi(config.username, config.password)

// create ExchangeService object
function getTasks (username, callback) {
  var upn = username + '@' + config.domain
  var exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2013)
  exch.XHRApi = ntlmXHRApi
  exch.Credentials = new ews.ExchangeCredentials(config.username, config.password)
  exch.ImpersonatedUserId = new ews.ImpersonatedUserId(ews.ConnectingIdType.PrincipalName, upn)
  ews.EwsLogging.DebugLogEnabled = false // turn off logging

  // set ews endpoint url to use
  exch.Url = new ews.Uri(config.url) // you can also use exch.AutodiscoverUrl

  var folder = new ews.FolderId(ews.WellKnownFolderName.Tasks)
  var sf = new ews.SearchFilter.IsNotEqualTo(ews.TaskSchema.IsComplete, true)
  var view = new ews.ItemView(config.tasksLimit)

  exch.FindItems(folder, sf, view)
    .then((response) => {
      var countTasks = response.Items.length
      if (countEmails === 0) {
        return callback(null, {})
      }
      if (response.Items.length === config.tasksLimit) {
        countTasks = '<' + config.tasksLimit
      }
      var item = {
        systemid: 'tasks-exchange',
        timestamp: new Date().getTime(),
        title: 'Ugjorte oppgaver (' + countTasks + ')',
        url: config.tasksUrl
      }
      return callback(null, item)
    }, (err) => {
      return callback(err)
    }
  )
}

module.exports = getTasks