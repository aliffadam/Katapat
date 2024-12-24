const express = require('express');
const registerRouter = express.Router();
module.exports = registerRouter;

const account = require('../db/client.js')

let base_url = require('./constants.js')

registerRouter.post(`${base_url}/register`, async (req, res) => {

    let { username, password } = req.body

    if(!username || !password) {
        res.status(404).send('Please provide valid input')
        return
    }

    let exists = await account.findOne(
        {
            username: username
        }
    )

    if(exists) {
        res.status(404).send('Username already exist!')
        return
    }

    let result = await account.insertOne(
        {
            username: username,
            password: password
        }
    )

    res.status(200).send(`Created account ${username}!`)
})