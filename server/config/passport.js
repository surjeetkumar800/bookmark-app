const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('Google Strategy Callback URL:', process.env.GOOGLE_CALLBACK_URL);
            console.log('Profile ID:', profile.id);
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName,
                image: profile.photos[0].value
            }).save();
            done(null, user);
        }
    )
);
