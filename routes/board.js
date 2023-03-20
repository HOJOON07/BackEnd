const express = require('express');

const router = express.Router();

const ARTICLE = [
  {
    title: 'title1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae animi placeat consectetur numquam eaque reprehenderit rem magnam fugit quod sunt commodi neque aliquam, dolores velit totam, repellat corrupti mollitia quam.',
    id: 1,
  },
  {
    title: 'title2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae animi placeat consectetur numquam eaque reprehenderit rem magnam fugit quod sunt commodi neque aliquam, dolores velit totam, repellat corrupti mollitia quam.',
    id: 2,
  },
];
//글 목록 보여주기
router.get('/', (req, res) => {
  res.render('board', { ARTICLE: ARTICLE, articleCounts: ARTICLE.length });
});

//글쓰기 모드로 이동
router.get('/write', (req, res) => {
  res.render('board_write');
});

//글 추가
router.post('/write', (req, res) => {
  const filter = ARTICLE.filter((el) => el.title == req.body.title);
  console.log(filter);
  if (filter.length >= 1) {
    const err = new Error('이미 있는 제목입니다.');
    err.statusCode = 400;
    throw err;
  } else if (req.body.title && req.body.content) {
    const newBoard = {
      title: req.body.title,
      content: req.body.content,
    };
    ARTICLE.push(newBoard);
    res.redirect('/board');
  } else if (!req.body.title || !req.body.content) {
    const err = new Error('제목을 입력해주세요');
    err.statusCode = 400;
    throw err;
  }
});

//글 수정 모드로 이동
router.get('/modify/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => req.params.title === article.title
  );
  const selectedArticle = ARTICLE[arrIndex];
  res.render('board_modify', { selectedArticle });
}); //어떤 글인지 알아야 하니까 파라미터로 title값을 받음

router.post('/modify/:title', (req, res) => {
  if (req.body.title && req.body.content) {
    const arrIndex = ARTICLE.findIndex(
      (article) => article.title === req.params.title
    );
    ARTICLE[arrIndex].title = req.body.title;
    ARTICLE[arrIndex].content = req.body.content;
    res.redirect('/board');
  } else {
    const err = new Error('폼 입력을 확인해주세요');
    err.statusCode = 400;
    throw err;
  }
});

//글 삭제
router.delete('/delete/:title', (req, res) => {
  const arrIndex = ARTICLE.findIndex(
    (article) => article.title === req.params.title
  );
  ARTICLE.splice(arrIndex, 1);
  res.send('삭제되었습니다.');
});

module.exports = router;
