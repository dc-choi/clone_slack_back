const express = require('express');
const router = express.Router();

const workspaceService = require('../service/workspaceService');

router.post('/userWorkspaces', async(req, res, next) => {
  try {
    const userEmail = req.session.passport.user;
    const workspaceObj = await workspaceService.getWorkspaceObj(req, res, next);
    if (workspaceObj === 'DB접근에 실패했습니다.') throw new Error(workspaceObj);
    const inviteObj = await workspaceService.getInviteObj(req, res, next);
    if (inviteObj === 'DB접근에 실패했습니다.') throw new Error(inviteObj);
    const obj = {
      userEmail,
      workspaceObj,
      inviteObj
    };
    res.status(200).send(obj);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

module.exports = router;
