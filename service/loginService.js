const bcrypt = require('bcrypt');

const user = require('../models/index').models.user;

module.exports = {
  async signup(params) {
    try {
      const { us_code, us_email, us_password } = params;
      const exCode = await user.findOne({ where: { us_code } }); // ex: us_220112_234523
      if (exCode) {
        throw new Error('회원가입이 이미 되어 있습니다.');
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
    } catch (error) {
      console.error(error);
    }
  },
}