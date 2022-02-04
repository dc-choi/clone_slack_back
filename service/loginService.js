const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { Op } = require('sequelize');

const user = require('../models/index').models.user;
const PK = require('../middleware/Pk');

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
    const { id_token } = req.body.tokenObj;
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID,
      });
      const verifyToken = ticket.getPayload();
      if (!verifyToken.email_verified) {
        return '유효하지 않는 회원입니다.';
      }
      const exSnsid = await user.findOne({
        where: {
          [Op.and]: [{us_email: verifyToken.email}, {us_sns_id: verifyToken.sub}] 
        }
      });
      if (!exSnsid) {
        let us_code = await PK.addPK('us');
        let check = await user.findOne({
          where: { us_code }
        });
        while (check != null) {
          us_code = await PK.addPK('us');
          check = await user.findOne({
            where: { us_code }
          });
        }
        await user.create({
          us_code,
          us_email: verifyToken.email,
          us_name: verifyToken.name,
          us_sns_id: verifyToken.sub, //password null
          us_admin: 'Y',
          us_ws_invite: 'Y',
          us_workspace: 'ws_220112_123456'
        })
      }
      return '로그인 완료';
    }
    verify().catch(console.log(error));
  }
}
