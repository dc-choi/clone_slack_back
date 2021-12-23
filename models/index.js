const Sequelize = require('sequelize');
const initModels = require("./init-models");
require('../config/env');

const config = {
	username: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	host: process.env.MYSQL_HOST,
	dialect: process.env.MYSQL_DIALECT,
};
let db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.models = initModels(sequelize);

module.exports = db;
