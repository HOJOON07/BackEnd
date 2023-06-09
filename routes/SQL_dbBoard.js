const { signedCookie } = require('cookie-parser');
const express = require('express');
const boardDB = require('../controllers/boardController');

const router = express.Router();

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
router.get('/', isLogin, (req, res) => {
  boardDB.getAllArticles((data) => {
    const ARTICLE = data;
    const articleCounts = ARTICLE.length;
    res.render('db_board', {
      ARTICLE,
      articleCounts,
      userId: req.session.userId,
    });
  });
});
//글쓰기 페이지 get
router.get('/write', isLogin, (req, res) => {
  res.render('db_board_write');
});

//데이터베이스에 추가
router.post('/write', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    const newArticle = {
      id: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };
    boardDB.writeArticle(newArticle, (data) => {
      if (data.affectedRows >= 1) {
        res.status(200);
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글 쓰기 실패');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목 또는 내용이 없습니다!');
    err.statusCode = 500;
    throw err;
  }
});
//수정 버튼 클릭후 수정페이지 get
router.get('/modify/:id', isLogin, (req, res) => {
  boardDB.getArticle(req.params.id, (data) => {
    if (data.length > 0) {
      res.render('db_board_modify', { selectedArticle: data[0] });
    } else {
      const arr = new Error('해당 게시글을 찾을 수 없습니다.');
      err.statusCode = 500;
      throw err;
    }
  });
});
// 글 수정하기 버튼 클릭
router.post('/modify/:id', isLogin, (req, res) => {
  if (req.body.title && req.body.content) {
    boardDB.modifyArticle(req.params.id, req.body, (data) => {
      if (data.affectedRows >= 1) {
        res.redirect('/dbBoard');
      } else {
        const err = new Error('글을 수정할 수 없습니다.');
        err.statusCode = 500;
        throw err;
      }
    });
  } else {
    const err = new Error('글 제목, 또는 내용이 없습니다.');
    err.statusCode = 500;
    throw err;
  }
});

//글 삭제하기
router.delete('/delete/:id', isLogin, (req, res) => {
  boardDB.deleteArticle(req.params.id, (data) => {
    console.log(data);
    res.send('삭제');
  });
});

//라우터에 주소 설정해서 미들웨어 설정.
router.get('/getAll', (req, res) => {
  boardDB.getAllArticles((data) => {
    res.send(data);
  });
});

module.exports = router;
