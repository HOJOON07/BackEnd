require('dotenv').config();
const express = require('express'); //익스프레스 불러오기

const cors = require('cors'); //cors 패키지 불러오기

const cookieParser = require('cookie-parser');

const session = require('express-session');

const app = express(); //app에서 익스프레스 패키지 쓴다
const bodyParser = require('body-parser');

const { PORT } = process.env; // 포트번호

//앱에서 cors
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('hojoon'));
app.use(
  session({
    secret: 'ghwns1007',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1000 * 60 * 60,
    // },
  }),
);
const mainRouter = require('./routes/index');
const userRouter = require('./routes/users');
const boardRouter = require('./routes/board');
const dataRouter = require('./routes/db');
const dbBoardRouter = require('./routes/dbBoard');
const cookieRouter = require('./routes/cookie');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/board', boardRouter);
app.use('/db', dataRouter);
app.use('/dbBoard', dbBoardRouter);
app.use('/cookie', cookieRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode);
  res.send(err.message + '<a href="/"> 홈으로 </a>');
});

//서버실행
app.listen(PORT, () => {
  console.log(`Server is Running ${PORT} PORT`);
});
