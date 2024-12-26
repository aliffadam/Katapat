const account = require('../db/client.js');

//THIS FUNCTION ONLY CHECKS USERNAME BUT DOES NOT EXIT IF NOT FOUND
async function find_username(req, res, next) {

    let { username } = req.body.username

    let result = await account.findOne(
        {
            username: username
        }
    )

    res.locals.user_exist = false

    //if username EXIST in database
    if(result) {
        res.locals.user_exist = true
        res.locals.account = result
    }

    next()
}

module.exports = { find_username }