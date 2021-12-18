const Sequelize = require('sequelize');
const initModels = require("./init-models");

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
let db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.models = initModels(sequelize);

module.exports = db;
