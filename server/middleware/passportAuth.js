// passport auth check
module.exports = {
    passportCheckAuth: function(req, res, next) {
        if(req.isAuthenticated()) { 
            return next();
        } else {
            res.json({ msg: 'You must be logged in to see that page', 
                        redirectURI: '/login' })
        }
    }
}