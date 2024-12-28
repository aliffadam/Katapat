function only_admin_gm(req, res, next) {

    const user = res.locals.account
    
    if(user.role != 'admin' && user.role != 'gm') {
        res.status(400).send('Unauthorized')
        return
    }

    next()
}

module.exports = { only_admin_gm }