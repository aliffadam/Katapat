const express = require('express');
const gameRouter = express.Router();

const { game_data } = require('../db/client.js');

const { jwt_search } = require('../utils/jwt-search.js')
const { verify_jwt } = require('../utils/verify-jwt.js');

gameRouter.route('/play')
    .post(verify_jwt, jwt_search, async (req, res) => {
        let { word } = req.body
    })
    .get(verify_jwt, jwt_search, async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .patch(verify_jwt, jwt_search, async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .delete(verify_jwt, jwt_search, async (req, res) => {
        res.status(204).send('Nothing here')
    })