const bcrypt = require('bcrypt');
salt_rounds = 10;

function validate_password(req, res, next) {

    let { password } = req.body.password

    //check if username exist in database
    if(!res.locals.user_exist) {
        res.status(400).send(`username ${req.body.username} not found`)
        return
    }

    //check if client gave password
    if(!password) {
        res.status(400).send('Please enter a password')
        return
    }

    //check if the password given same as password in database
    if(!(bcrypt.compareSync(password, res.locals.account.password))) {
        res.status(400).send('Password is incorrect')
        return
    }

    next()
}

module.exports = { validate_password }