var jwt = require('jsonwebtoken');
jwt_secret = 'nevergonnagiveyouup'

const { account } = require('../db/client.js');

async function jwt_search(req, res, next) {

    let jwt_data = res.locals.jwt_data

    let result = await account.findOne(
        {
            username: jwt_data.username
        }
    )

    if(!result) {
        res.status(400).send('Unable to find user')
        return
    }

    res.locals.account = result

    next()
}

module.exports = { jwt_search }