const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('../auth/isLogged');
const loginService = require('../service/loginService');

router.post('/signup', isNotLoggedIn, async(req, res) => {
  try {
    const params = req.body;
    const str = await loginService.signup(params);
    res.status(200).send(str);
  } catch (error) {
    res.status(500).send('/api/auth/signup is broke!');
    next(error);
  }
});

router.post('/localLogin', isNotLoggedIn, async(req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user)
      return res.send(info.message);
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.send(user);
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
});

module.exports = router;
