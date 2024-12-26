var jwt = require('jsonwebtoken');
jwt_secret = 'nevergonnagiveyouup'

function verify_jwt(req, res, next) {
    const bearer_header = req.headers['authorization']

    if(typeof bearer_header === 'undefined') {
        res.status(400).send('No jwt token found')
        return
    }

    const bearer = bearer_header.split(' ')
    res.locals.jwt = bearer[1]

    jwt.verify(res.locals.jwt, jwt_secret, (error, auth_data) => {
        if(error) {
            res.status(400).send('Unauthorized')
            return
        }
        else {
            res.locals.auth_data = auth_data
            next()
        }
    })
}

module.exports = { verify_jwt }