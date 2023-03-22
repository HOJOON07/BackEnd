const mongoClient = require('./mongoConnect');

const login = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');
    const duplicatedUser = await user.findOne({ id: req.body.id });
    // if (duplicatedUser) {
    //   if (duplicatedUser.password === req.body.password) {
    //     req.session.login = true;
    //     req.session.userId = req.body.id;

    //     res.cookie('user', req.body.id, {
    //       maxAge: 1000 * 10,
    //       httpOnly: true,
    //       signed: true,
    //     });
    //     res.status(200);
    //     res.send('로그인성공');
    //   }
    // } else {
    //   res.status(400);
    //   res.send(
    //     '비밀번호가 다릅니다. 로그인을 다시 시도해주세요.<br><a href="/login">로그인 페이지로 이동</a>',
    //   );
    // }
    if (!duplicatedUser)
      return res
        .status(400)
        .send(
          '아이디와 비밀번호가 다릅니다.<br><a href="/login">로그인으로 이동</a>',
        );
    if (duplicatedUser.password !== req.body.password)
      return res
        .status(400)
        .send(
          '아이디와 비밀번호가 다릅니다.<br><a href="/login">로그인으로 이동</a>',
        );
    req.session.login = true;
    req.session.userId = req.body.id;

    res.cookie('user', req.body.id, {
      maxAge: 1000 * 10,
      httpOnly: true,
      signed: true,
    });
    res.stauts(200).send('로그인 성공');
  } catch (err) {
    res.status(400);
    res.send(
      '비밀번호가 다릅니다. 로그인을 다시 시도해주세요.<br><a href="/login">로그인 페이지로 이동</a>',
    );
    console.error(err);
  }
};

module.exports = login;
