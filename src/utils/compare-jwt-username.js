var jwt = require('jsonwebtoken');
jwt_secret = 'nevergonnagiveyouup'

function compare_token(req, res, next) {

    try {

        let { username } = req.body

        if(username == res.locals.auth_data.username) {
            next()
        }
        else {
            res.status(400).send('Unauthorized')
            return
        }

    } catch (error) {
        res.status(400).send(error.message);
        return
    }
}

module.exports = { compare_token }