const bcrypt = require('bcrypt');
salt_rounds = 10;

function check_password(req, res, next) {

    let { password } = req.body.password

    if(!res.locals.user_exist) {
        res.status(400).send(`username ${req.body.username} not found`)
        return
    }

    if(!password) {
        res.status(400).send('Please enter a password')
        return
    }

    if(!(bcrypt.compareSync(password, res.locals.account.password))) {
        res.status(400).send('Password is incorrect')
        return
    }

    next()
}

module.exports = { check_password }