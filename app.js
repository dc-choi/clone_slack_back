const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

/* 이부분은 서버를 시작할때마다 매번 스키마를 건드려서 설정 변경
const { sequelize } = require('./models');

sequelize.sync({ force: false })
	.then(() => {
		console.log('데이터베이스 연결 성공');
	})
	.catch((error) => {
		console.error(error);
	});
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(404).send(err);
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('Something broke!')
});

module.exports = app;
