const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const session = require('express-session');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const user = require('../models/index').models.user;
//const workspace = require('../models/index').models.workspace;
const PK = require('../middleware/Pk');

module.exports = {
  async localSignup(req, res, next) {
    const { us_email } = req.body;
    const us_password = 'abcdefg';
    const ws_init_code = 'ws_220112_123456'; //회원가입을 위한 임의 workspace
    //const ws_init_name = 'slack';
    const exMail = await user.findOne({ where: { us_email } });
    if (exMail) {
      return '회원가입이 이미 되어 있습니다.';
    } else {
      const name = us_email.split('@')[0];
      const hash = await bcrypt.hash(us_password, 12);
      let us_code = await PK.addPK('us');
      let check = await user.findOne({ where : { us_code }});
      while (check != null) {
        us_code = await PK.addPK('us');
        check = await user.findOne({ where : { us_code }});
      }
      await user.create({
        us_code,
        us_email,
        us_name: name,
        us_password: hash,
        us_admin: 'Y',
        us_workspace: ws_init_code,
        us_ws_invite: 'Y'
      });
      return '회원가입 완료.';    
    }
  }
}
