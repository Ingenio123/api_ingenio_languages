const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;



passport.use(new GoogleStrategy({
  clientID: '877847206227-9voegpv2kie0gmu6knnkd6t7a8pvm3vd.apps.googleusercontent.com',
  clientSecret: 'ETJlxQSUKZtPxDHIc0dbEy4E',
  callbackURL: "http://localhost:3000/google/auth",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  console.log(profile)
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});