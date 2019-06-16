module.exports = {

    ensureAuthenticated: function (req, res, next) {
        if ( req.isAuthenticated() ) {
            return next();
        }
        req.flash('err', 'please check your login details')
        res.redirect('/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard')
    }
};