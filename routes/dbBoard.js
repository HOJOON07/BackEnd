const { signedCookie } = require('cookie-parser');
const express = require('express');

const multer = require('multer');
const fs = require('fs');

const {
  getAllArticles,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
} = require('../controllers/boardController');
const router = express.Router();

// 파일 업로드 설정
const dir = './uploads';
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '_' + Date.now());
  },
});
// const upstorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, dir);
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.fieldname + '_' + Date.now());
//   },
// });

const limits = {
  fileSize: 1024 * 1024 * 2,
};

const upload = multer({ storage, limits });
// const modifyUpload = multer({ upstorage, limits });

if (!fs.existsSync(dir)) fs.mkdirSync(dir);

//로그인 확인용 미들웨어
const isLogin = (req, res, next) => {
  if (req.session.login || req.signedCookies.user) {
    next();
  } else {
    res.status(404);
    res.send(
      '로그인이 필요한 서비스 입니다.! <br><a href="/login">로그인 페이지로 이동</a>',
    );
  }
  // console.log(req.session);
};
//게시판 페이지 호출
router.get('/', isLogin, getAllArticles);
//글쓰기 페이지 get
router.get('/write', isLogin, (req, res) => {
  res.render('db_board_write');
});

// //데이터베이스에 추가
router.post('/write', isLogin, upload.single('img'), writeArticle);

// //수정 버튼 클릭후 수정페이지 get
router.get('/modify/:id', isLogin, getArticle);
router.post('/modify/:id', isLogin, upload.single('img'), modifyArticle);
router.delete('/delete/:id', isLogin, deleteArticle);

// //글 삭제하기
// router.delete('/delete/:id', isLogin, (req, res) => {
//   boardDB.deleteArticle(req.params.id, (data) => {
//     console.log(data);
//     res.send('삭제');
//   });
// });

// //라우터에 주소 설정해서 미들웨어 설정.
// router.get('/getAll', (req, res) => {
//   boardDB.getAllArticles((data) => {
//     res.send(data);
//   });
// });

module.exports = router;
