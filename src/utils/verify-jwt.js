var jwt = require('jsonwebtoken');
jwt_secret = 'nevergonnagiveyouup'

function verify_jwt(req, res, next) {

    //getting jwt_token
    const authHeader = req.headers.authorization
    const token_jwt = authHeader && authHeader.split(` `)[1]

    //check if server got token
    if (token_jwt == null) {
        res.status(401).send('No jwt token found')
        return
    }

    //put in locals for so other function can use
    res.locals.token_jwt = token_jwt

    //verify with secret
    jwt.verify(res.locals.token_jwt, jwt_secret, (error, auth_data) => {
        if(error) {
            res.status(400).send('Unauthorized')
            return
        }
        else {
            //keep authorized user data
            res.locals.auth_data = auth_data
            next()
        }
    })
}

module.exports = { verify_jwt }