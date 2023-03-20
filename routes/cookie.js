const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.cookies);
  res.render('cookie');
});

router.get('/cook', (req, res) => {
  res.cookie('cookie', true, {
    maxAge: 1000 * 20,
    httpOnly: false,
  });
  res.status(200).json('쿠키 굽기 성공!');
});

module.exports = router;
