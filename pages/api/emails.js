const { google } = require('googleapis')

// Set up the Gmail API client.
const gmail = google.gmail({
  version: 'v1',
  auth: 'AIzaSyA_NKFXH7aLknWJWuiB3zrXuM79WrkztKM'
})

// Define an API endpoint that retrieves the emails from the user's inbox.
exports.handler = (event, context, callback) => {
  gmail.users.messages.list({
    userId: 'nl.inbox.app@gmail.com',
    labelIds: ['INBOX']
  }, (err, response) => {
    if (err) {
      callback(err)
    } else {
      callback(null, response.data.messages)
    }
  })
}
