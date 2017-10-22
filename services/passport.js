const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // Loading user model class here in this file(1 argument). NOTE: we cant directly
// require models like other files, so we require mongoose and then fetch users collection and attach to User Model class.
// So User is called Model Class(Just handler for user collection in mongodb)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
});
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    },
     (accessToken, refreshToken, profile, done) => {
      console.log('profile:', profile);
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if(existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }).save().then(user => done(null, user));
        }
      });
    }
  )
);