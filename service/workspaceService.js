const sequelize = require('sequelize');

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
    const { us_email } = req.body;
    const checkUser = await user.findOne({
      where: { us_email }
    })
    if (!checkUser)
      return '유저 정보가 없습니다.'
    else {
      await user.update(
        {us_ws_invite: 'Y'},
        {where: { us_email }}
      )
      return '초대 성공'
    }
  }
}