const express = require('express');
const router = express.Router();

const indexService = require('../service/indexService');

router.post('/mail', async(req, res, next) => {
  try {
    const ranNum = await indexService.sendMail(req.body);
    res.status(200).send(ranNum);
  } catch (error) {
    res.status(500).send('/api/mail is broke!');
    next(error);
  }
});

module.exports = router;
