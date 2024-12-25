const express = require('express');
const registerRouter = express.Router();
module.exports = registerRouter;

const account = require('../db/client.js')

registerRouter.post('/register', async (req, res) => {

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

    //if all pass, insert into database
    let result = await account.insertOne(
        {
            username: username,
            password: password
        }
    )

    res.status(200).send(`Created account ${username}!`)
})