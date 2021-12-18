const Sequelize = require('sequelize');
let fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

fs
	.readdirSync(__dirname)
	.filter((file) => {
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach((file) => {
		let model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
		console.log('model.name:' + model.name);  // 테스트로그 model명..
	});

Object.keys(db).forEach((modelName) => {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

module.exports = db;
