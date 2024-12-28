const express = require('express');
const word_listRouter = express.Router();

const { word_list } = require('../db/client.js');

const { jwt_search } = require('../utils/jwt-search.js')
const { verify_jwt } = require('../utils/verify-jwt.js')

word_listRouter.route('/edit')
    .post(verify_jwt, jwt_search, async (req, res) => {

        const user = res.locals.account
        if(user.role != 'admin' && user.role != 'gm') {
            res.status(400).send('Unauthorized')
            return
        }
        
        let { word } = req.body

        if(typeof word != 'string') {
            res.status(400).send('Please enter a word')
            return
        }

        if(word.length != 5) {
            res.status(400).send('Please enter a 5 letter word')
            return
        }

        word = word.toLocaleLowerCase()

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
    .get(async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .patch(async (req, res) => {
        res.status(204).send('Nothing here')
    })
    .delete(verify_jwt, jwt_search, async (req, res) => {
        
        const user = res.locals.account
        if(user.role != 'admin' && user.role != 'gm') {
            res.status(400).send('Unauthorized')
            return
        }

        let { word } = req.body

        if(!word) {
            res.status(400).send('Please enter the word to delete')
            return
        }

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