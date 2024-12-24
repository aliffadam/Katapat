const client = require('./database.js')

//db_wm = await client.db('db_wm')
account = client.db('db_wm').collection('account')

module.exports = account