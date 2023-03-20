const express = require('express');

const router = express.Router();

// http://localhost:5500/users

router.get('/', (req, res) => {
  res.render('users', { name: '김호준' });
});

module.exports = router;

//서버의 가장 기본주소에 대한 처리 -> 서버코드를 깔끔하게 유지하기 위한 파일임.
