const express = require('express');
const router = express.Router();
let Workspace = require('../models/index').models.workspace;

router.get('/', async(req, res, next) => {
  console.log(Workspace);
  const data = await Workspace.findAll();
  res.send({data});
});

module.exports = router;
