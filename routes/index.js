const express = require('express');
const router = express.Router();

const indexService = require('../service/indexService');

router.post('/mail', async(req, res) => {
  const ranNum = await indexService.sendMail(req.body);
  res.status(200).send(ranNum);
});

module.exports = router;
