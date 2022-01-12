const passport = require('passport');

const local = require('./localStrategy');
const user = require('../models/index').models.user;

module.exports = () => {
  // 로그인시 실행되며, req.session에 데이터를 저장 즉, 사용자 정보를 세션에 아이디로 저장함.
  passport.serializeUser((user, done) => {
    done(null, user.us_code);
  });

  // 매 요청시 실행됨. 즉, 세션에 저장한 아이디를 통해 사용자 정보를 불러옴.
  passport.deserializeUser((us_code, done) => {
    user.findOne({ where: { us_code } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};