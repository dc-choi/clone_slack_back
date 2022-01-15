const express = require('express');
const router = express.Router();

const indexService = require('../service/indexService');

router.post('/mail', async(req, res, next) => {
  try {
    const ranNum = await indexService.sendMail(req, res, next);
    if (typeof ranNum === 'string') throw new Error(ranNum);
    res.status(200).send(ranNum);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

module.exports = router;
