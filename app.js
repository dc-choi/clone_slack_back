const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session')
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const passportConfig = require('./passport');
const { Store } = require('express-session');
require('./config/env');

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(express.static(path.join(__dirname, 'public')));
passportConfig(); // passport의 설정 적용

const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const sessionStore = new MySQLStore(options);

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));

// 이 부분의 설정은 반드시 세션 설정 뒤에 사용해야 한다.
app.use(passport.initialize()); // 요청에 passport 설정을 넣는다.
app.use(passport.session()); // req.session에 passport 정보를 저장한다.

app.use('/api', indexRouter);
app.use('/api/auth', loginRouter);

app.use(cors({
  origin: ['*'],
  credentials: true,
}));

app.use((err, req, res, next) => {
  if (res.statusCode === 500)
    res.status(500).send(err.message);
  if (res.statusCode === 401)
    res.status(401).send(err.message);
  if (res.statusCode === 404)
    res.status(404).send(err.message);
});

module.exports = app;
