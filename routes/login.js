const express = require('express');
const login = require('../controllers/loginController');
const userDB = require('../controllers/userControlles');

const router = express.Router();
// 로그인 페이지로 이동
router.get('/', (req, res) => {
  res.render('login');
});

// 로그인 처리
router.post('/', login);

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('user');
    res.redirect('/');
  });
});

module.exports = router;
