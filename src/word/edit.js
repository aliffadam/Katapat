const express = require('express');
const word_listRouter = express.Router();

const { word_list } = require('../db/client.js');

const { jwt_search } = require('../utils/jwt-search.js')
const { verify_jwt } = require('../utils/verify-jwt.js')
const { only_admin_gm } = require('../utils/access.js')
const { input_word } = require('../utils/input-word.js')

word_listRouter.route('/edit')
    .post(verify_jwt, jwt_search, only_admin_gm, input_word, async (req, res) => {

        let word = res.locals.word

        let word_exist = await word_list.findOne(
            {
                word: word
            }
        )

        if(word_exist) {
            res.status(400).send(`The word ${word} already exist`)
            return
        }

        let inserted_word = await word_list.insertOne(
            {
                word: word
            }
        )

        if(!inserted_word) {
            res.status(400).send(`The word ${word} was unable to be added`)
            return
        }

        res.status(200).send(`Inserted word ${word}`)
    })
    .get(verify_jwt, jwt_search, only_admin_gm, input_word, async (req, res) => {

        let word = res.locals.word

        if(word == 'all') {

            let find_all = await word_list.find().toArray()
            
            if(!find_all) {
                res.status(400).send('Unable to get word')
                return
            }

            res.status(200).send(find_all)
            return
        }

        let found_word = await word_list.findOne(
            {
                word: word
            }
        )

        if(!found_word) {
            res.status(200).send(`The word ${word} was not found`)
            return
        }

        res.status(200).send(found_word)
    })
    .patch(async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .delete(verify_jwt, jwt_search, only_admin_gm, input_word, async (req, res) => {

        let word = res.locals.word

        let deleted_word = await word_list.deleteOne(
            {
                word: word
            }
        )

        if(!deleted_word) {
            res.status(400).send(`Could not delete word ${word}`)
            return
        }

        res.status(200).send(`Word ${word} deleted`)
    })

module.exports = word_listRouter;