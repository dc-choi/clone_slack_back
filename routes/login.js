const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../auth/isLogged');
const loginService = require('../service/loginService');

router.post('/localSignup', isNotLoggedIn, async(req, res, next) => {
  try {
    const str = await loginService.localSignup(req, res, next);
    if (str === '회원가입이 이미 되어 있습니다.') throw new Error(str);
    res.status(200).send(str);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.post('/localLogin', isNotLoggedIn, async(req, res, next) => {
  req.body.us_password = 'abcdefg';
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      res.status(500);
      return next(authError);
    }
    if (!user) {
      res.status(500);
      return res.send(info.message);
    }
    return req.login(user, () => {
      return res.send(user);
    });
  })(req, res, next);
});

router.get('/googleLogin',
 passport.authenticate("google", { scope: ["email", "profile"], prompt: 'select_account' })
);

router.get('/googleLogin/callback', passport.authenticate('google', {
  failureRedirect: "http://localhost:3000/signin/",
}), (req, res) => {
  res.redirect("http://localhost:3000/signin/SetupWorkspace/");
});

router.get('/logout', isLoggedIn, (req, res) => {
  try {
    req.logout();
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).send('로그아웃을 완료하였습니다.');
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

module.exports = router;
