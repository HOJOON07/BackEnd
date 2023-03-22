const express = require('express');
const login = require('../controllers/loginController');
const userDB = require('../controllers/userControlles');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', login);

// router.post('/', (req, res) => {
//   userDB.userCheck(req.body.id, (data) => {
//     //백엔드 세션 생성
//     if (data.length === 1) {
//       if (data[0].PASSWORD === req.body.password) {
//         req.session.login = true;
//         req.session.userId = req.body.id;

//         //로그인 쿠키 발행 -> res에서 쿠키 굽는다.
//         res.cookie('user', req.body.id, {
//           maxAge: 1000 * 10,
//           httpOnly: true,
//           signed: true,
//         });

//         res.status(200);
//         res.redirect('/dbBoard');
//       } else {
//         res.status(400);
//         res.send(
//           '비밀번호가 다릅니다. 로그인을 다시시도해주세요. <br><a href="/login">로그인 페이지로 이동</a>',
//         );
//       }
//     } else {
//       res.status(400);
//       res.send(
//         '해당 아이디가 존재하지 않습니다.로그인을 다시시도해주세요. <br><a href="/register">회원 가입 하기</a>',
//       );
//     }
//   });
// });

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});

module.exports = router;
