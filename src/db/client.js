const client = require('./database.js')

account = client.db('db_wm').collection('account')
word_list = client.db('db_wm').collection('word_list')

module.exports = { account, word_list }