function input_word(req, res, next) {

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

    if(word == '     ') {
        res.status(400).send('Please enter a word')
        return
    }

    res.locals.word = word

    next()
}