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

        let account = res.locals.account

        var token = jwt.sign(
            {
                _id: account._id,
                username: account.username
            },
            jwt_secret,
            { expiresIn: 60*60*2 } //2 hrs
        )

        res.status(200).send(token)
    })
    //GET /login uses jwt_data to identify who is accessing right now
    //for getting user data
    //admin => get all account
    //gm => can find account by specifying username: 'wanted-username' (maybe can try implement regex)
    //player => can only get self data
    .get(verify_jwt, async (req, res) => {

        let jwt_data = res.locals.jwt_data

        let result = account.findOne(
            {
                username: jwt_data.username
            }
        )

        res.status(200).send(result)
    })
    .patch(async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .delete(async (req, res) => {
        res.status(204).send('Nothing here')
    })

module.exports = loginRouter;