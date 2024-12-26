const express = require('express');
const registerRouter = express.Router();

const bcrypt = require('bcrypt');
salt_rounds = 10;

const account = require('../db/client.js');

registerRouter.route('/register')
    .post(async (req, res) => {

        let { username, password } = req.body

        //check if enough data
        if(!username || !password) {
            res.status(404).send('Please provide valid input')
            return
        }

        //check if username already exist
        let exists = await account.findOne(
            {
                username: username
            }
        )

        //reject if username already exist
        if(exists) {
            res.status(404).send('Username already exist!')
            return
        }

        const password_hashed = bcrypt.hashSync(password, salt_rounds)

        //if all pass, insert into database
        let result = await account.insertOne(
            {
                username: username,
                password: password_hashed
            }
        )

        res.status(200).send(`Created account ${username}!`)
    })
    .get(async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .patch(async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .delete(async (req, res) => {
        res.status(204).send('Nothing here')
    })

module.exports = registerRouter;