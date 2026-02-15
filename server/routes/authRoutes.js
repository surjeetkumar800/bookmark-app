const passport = require('passport');

module.exports = app => {
    app.get(
        '/api/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/api/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect(process.env.CLIENT_URL || '/');
        }
    );

    app.get('/api/auth/logout', (req, res, next) => {
        req.logout((err) => {
            if (err) { return next(err); }
            res.redirect(process.env.CLIENT_URL || '/');
        });
    });

    app.get('/api/auth/current_user', (req, res) => {
        res.send(req.user);
    });
};
