const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const user = require('../models/index').models.user;

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'us_email',
    passwordField: 'us_password',
  }, async (us_email, us_password, done) => {
    try {
      const exUser = await user.findOne({ where: { us_email } });
      if (exUser) {
        done(null, exUser);
      } else {
        done(null, false, { message: '가입되지않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }))
}