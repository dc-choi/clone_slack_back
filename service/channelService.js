const sequelize = require('sequelize');

const channel = require('../models/index').models.channel;
const PK = require('../middleware/PK');

module.exports = {
  async makeChannel(req, res, next) {
    const { ch_name, ch_description } = req.body;
    const writer = req.session.passport.user.split('@')[0]; //session 저장된 user info
    const exCh = await channel.findOne({ where: { ch_name }});
    if (exCh) {
      return '같은 이름의 채널이 존재합니다.';
    } else {
      let ch_code = await PK.addPK('us');
      let check = await channel.findOne({ where : { ch_code }});
      while (check != null) {
        ch_code = await PK.addPK('us');
        check = await channel.findOne({ where : { ch_code }});
      }
      await channel.create({
        ch_code,
        ch_name,
        ch_description,
        ch_writer: writer,
        ch_workspace: 'ws_220112_123456'
      })
      return '채널 생성 완료.';
    }
  }
}
