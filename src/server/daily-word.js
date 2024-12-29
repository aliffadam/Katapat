const { word_today, word_list } = require('../db/client')

const { day_interval } = require('./day-interval')

async function daily_word() {

    if(day_interval()) {
        //randomly pick a new word

        let remove_old = await word_today.deleteMany()

        //TODO should create checks to retry

        let list_words = await word_list.find().toArray()

        const chosen_word = list_words[Math.floor(Math.random() * list_words.length)];

        let insert_new = await word_today.insertOne(
            {
                word: chosen_word
            }
        )
    }

}