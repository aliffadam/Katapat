const express = require('express');
const loginRouter = express.Router();

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
jwt_secret = 'nevergonnagiveyouup'

const account = require('../db/client.js');



//TODO: should implement id so that user can go account/:id or account/login/id: to do all related stuff
// plus we can verify with jwt they give with the 

loginRouter.route('/login')
    .post(async (req, res) => {

        let { username, password } = req.body

        if(!username || !password) {
            res.status(404).send('Please provide valid input')
            return
        }

        let found_user = await account.findOne(
            {
                username: username
            }
        )

        if(!found_user) {
            res.status(400).send(`${username} not found`)
            return
        } 

        if(!(bcrypt.compareSync(password, found_user.password))) {
            res.status(400).send('Password is incorrect')
        }

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
    .get(async (req, res) => {

        let { username, password } = req.body

        let { auth } = req.headers.authorization
        let authSplitted = auth.split(' ')
        let token = authSplitted[1]

        let decoded = jwt.verify(token, jwt_secret)

        res.status(204).send('Nothing here')
    })
    .patch(async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .delete(async (req, res) => {
        res.status(204).send('Nothing here')
    })

module.exports = registerRouter;