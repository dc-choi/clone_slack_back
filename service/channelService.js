const { UnknownConstraintError } = require('sequelize');
const sequelize = require('sequelize');

const { user, channel, channeluserlist } = require('../models/index').models;
const Op = require('sequelize').Op;
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
      });
      return '채널 생성 완료.';
    }
  },
  async searchChannel(req, res, next) {
    let searchWord = req.body.searchWord;
    let haveCh = await channel.findOne({ //ch_name or ch_description 유무 확인
        where: {
          [Op.or]: [
            {
              ch_name: {
                [Op.like]: "%"+searchWord+"%"
              }
            },
            {
              ch_description: {
                [Op.like]: "%"+searchWord+"%"
              }
            }
          ]
        }
      })
    if(!haveCh) {
      return '검색된 채널 이름 또는 설명이 없습니다.'
    } else {
      haveCh = await channel.findAll({ //ch_name or ch_description 존재 한다면 searchWord가 포함되는 것 모두 찾기
        where: {
          [Op.or]: [
            {
              ch_name: {
                [Op.like]: "%"+searchWord+"%"
              }
            },
            {
              ch_description: {
                [Op.like]: "%"+searchWord+"%"
              }
            }
          ]
        },
        order: [['ch_name', 'ASC']] //channel name 오름차순 정렬
      })
      return res.json(haveCh); //json 형태로 전달
    }
  }
}