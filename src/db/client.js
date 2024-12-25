const client = require('./database.js')

account = client.db('db_wm').collection('account')

module.exports = account