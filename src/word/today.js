const express = require('express');
const today_wordRouter = express.Router();

const { word_today } = require('../db/client.js');

const { jwt_search } = require('../utils/jwt-search.js')
const { verify_jwt } = require('../utils/verify-jwt.js')
const { only_admin_gm } = require('../utils/access.js')

const { insert_random } = require('../server/insert-random.js')

today_wordRouter.route('/today')
    .post(verify_jwt, jwt_search, only_admin_gm, async (req, res) => {

        insert_random()

        res.status(200).send("Changed today's word")
    })
    .get(verify_jwt, jwt_search, only_admin_gm, async (req, res) => {
        
        let get_word_today = await word_today.find().toArray()

        res.status(200).send(get_word_today)
    })
    .patch(async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .delete(async (req, res) => {
        res.status(204).send('Nothing here')
    })

module.exports = today_wordRouter;