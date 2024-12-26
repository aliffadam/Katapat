const express = require('express');
const loginRouter = express.Router();

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
jwt_secret = 'nevergonnagiveyouup'

const account = require('../db/client.js');

let { find_username } = require('../utils/find-username.js')
let { validate_password } = require('../utils/validate-password.js')
let { verify_jwt } = require('../utils/verify-jwt.js')

//TODO: should implement id so that user can go account/:id or account/login/id: to do all related stuff
// plus we can verify with jwt they give with the 

loginRouter.route('/login')
    .post(find_username, validate_password, async (req, res) => {

        let { username, password } = req.body

        var token = jwt.sign(
            {
                _id: found_user._id,
                username: found_user.username
            },
            jwt_secret,
            { expiresIn: 60*60*2 }
        )

        res.status(200).send(token)
    })
    .get(verify_jwt, async (req, res) => {

        let { username, password } = req.body

        let result = await account.findOne(
            {
                username: username
            }
        )

        res.status(204).send('Nothing here')
    })
    .patch(async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .delete(async (req, res) => {
        res.status(204).send('Nothing here')
    })

module.exports = registerRouter;