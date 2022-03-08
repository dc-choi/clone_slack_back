const express = require('express');
const router = express.Router();

const workspaceService = require('../service/workspaceService');
const channelService = require('../service/channelService');
const { isLoggedIn } = require('../auth/isLogged');

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
//채널
router.post('/makeChannel', isLoggedIn, async(req, res, next) => {
  try {
    const str = await channelService.makeChannel(req, res, next);
    if (str === '같은 이름의 채널이 존재합니다.') throw new Error(str);
    res.status(200).send(str);
  } catch (error) {
    res.status(500);
    next(error);
  }
})

router.post('/searchChannel', isLoggedIn, async(req, res, next) => {
  try {
    const str = await channelService.searchChannel(req, res, next);
    if (str === '검색된 채널 이름 또는 설명이 없습니다.') throw new Error(str);
  } catch (error) {
    res.status(500);
    next(error);
  }
})

module.exports = router;
