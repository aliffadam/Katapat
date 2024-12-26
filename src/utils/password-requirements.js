var jwt = require('jsonwebtoken');

function compareToken(req, res, next) {

    try {
        
        let decoded = jwt.verify(token, 'chiikawaaaaaaa')
        
        let token_name = decoded.player

        if(req.body.playerId == token_name) {
            next()
        }
        else {
            res.send('Unauthorized')
        }

    } catch (error) {
        return res.status(400).send(error.message);
    }
}

module.exports = { compareToken }