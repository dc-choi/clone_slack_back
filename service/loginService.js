const bcrypt = require('bcrypt');

const user = require('../models/index').models.user;

module.exports = {
  async localSignup(req, res, next) {
    const { us_code, us_email, us_password } = req.body;
    const exCode = await user.findOne({ where: { us_code } }); // ex: us_220112_123456
    if (exCode) {
      return '회원가입이 이미 되어 있습니다.';
    }
    const name = us_email.split('@')[0];
    const hash = await bcrypt.hash(us_password, 12);
    await user.create({
      us_code,
      us_email,
      us_name: name,
      us_password: hash,
      us_admin: 'Y',
      us_workspace: 'ws_220112_123456'
    });
    return '회원가입 완료.';
  },
  async googleLogin(req, res, next) { //google login, signup 한번에 구현
    const { us_code, us_sns_id, us_email, us_name } = req.body;
    const exSnsid = await user.findOne({ where: { us_sns_id }});
    if (!exSnsid) {
      await user.create({
        us_code,
        us_email,
        us_name,
        us_sns_id, //password null
        us_admin: 'Y',
        us_ws_invite: 'Y',
        us_workspace: 'ws_220112_123456'
      })
    }
    return '로그인 완료';
  }
}