const express = require('express');
const registerUser = require('../controllers/userControlles');

// const userDB = require('../controllers/userControlles');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

// router.post('/', async (req, res) => {
//   const duplicatedUser = await userDB.userCheck(req.body.id);
//   if (!duplicatedUser) {
//     const registerResult = await userDB.registerUser(req.body);
//     if (registerResult) {
//       res.status(200);
//       res.send(
//         '회원 가입 성공! <br><a href="/login">로그인 페이지로 이동 </a>',
//       );
//     } else {
//       res.status(500);
//       res.send(
//         '회원 가입 실패! 알 수 없는 문제 발생 <br><a href="/register">회원가입 페이지로 이동 </a>',
//       );
//     }
//   } else {
//     res.status(500);
//     res.send(
//       '회원 가입 실패! 동일한 ID를 가진 회원이 존재합니다!! <br><a href="/register">회원가입 페이지로 이동 </a>',
//     );
//   }
// });
router.post('/', registerUser);

module.exports = router;
