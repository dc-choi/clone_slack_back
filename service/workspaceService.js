const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const PK = require('../middleware/Pk');
const { user, workspace } = require('../models/index').models;

module.exports = {
  async getWorkspaceObj(req, res, next) {
    const workspaceObj = await user.findAll({
      include: [
        {model: workspace, as: 'us_workspace_workspace', attributes: []}
      ],
      attributes: [
        ['us_workspace', 'workspaceCode'],
        [sequelize.col('us_workspace_workspace.ws_name'), 'workspaceName'],
        [sequelize.fn('COUNT', sequelize.col('us_workspace')), 'workspaceCount']
      ],
      where: {
        us_ws_invite: 'Y'
      }
    });
    if (!workspaceObj) return 'DB접근에 실패했습니다.'
    return workspaceObj;
  },
  async getInviteObj(req, res, next) {
    const inviteObj = await user.findAll({
      include: [
        {model: workspace, as: 'us_workspace_workspace', attributes: []}
      ],
      attributes: [
        ['us_workspace', 'workspaceCode'],
        [sequelize.col('us_workspace_workspace.ws_name'), 'workspaceName'],
        [sequelize.fn('COUNT', sequelize.col('us_workspace')), 'workspaceCount']
      ],
      where: {
        us_ws_invite: 'N'
      }
    });
    if (!inviteObj) return 'DB접근에 실패했습니다.'
    return inviteObj;
  },
  async inviteUser(req, res, next) {
    const invitedUser = req.body.invitedUser;
    const invitingUser = req.session.passport.user;
    const us_password = 'abcdefg';
    const hash = await bcrypt.hash(us_password, 12);
    const checkUser = await user.findOne({ //초대받는 유저 확인
      where: { us_email: invitedUser }
    })
    const workspaceCode = await user.findOne({ //초대하는 사람의 ws_code 및 admin 확인
      where: { us_email: invitingUser},
      attributes: ['us_email', 'us_admin' ,'us_workspace']
    })
    const checkWs = await user.findOne({ //초대받는사람이 이미 워크스페이스에 초대 되었는지 확인
      where: { 
        us_email: invitedUser,
        us_workspace: workspaceCode.us_workspace
      }
    })
    if (!checkUser)
      return '유저 정보가 없습니다.'
    if (workspaceCode.us_admin == 'Y')
    {
      if (checkWs)
        return '이미 유저가 해당 워크스페이스에 초대 되어있습니다.'
      else {
        let us_code = await PK.addPK('us');
        let check = await user.findOne({ where: { us_code } });
        while (check != null) {
          us_code = await PK.addPK('us');
          check = await user.findOne({ where: { us_code } });
        }
        await user.create({
          us_code,
          us_email: invitedUser,
          us_name: checkUser.us_name,
          us_password: hash,
          us_admin: 'N',
          us_workspace: workspaceCode.us_workspace,
          us_ws_invite: 'N'
        })
        return '초대 성공'
      }
    }
    else
      return '관리자가 아니면 초대 할 수 없습니다.'
  }
}