const mongoClient = require('./mongoConnect');

const REGISTER_DUPLICATED_MSG =
  '동일한 ID를 가진 회원이 존재합니다!<br><a href="/register">회원가입으로 이동</a>';
const REGISTER_SUCCES_MSG =
  '회원가입 성공!<br><a href="/login">로그인 페이지로 이동</a>';
const REGISTER_UNEXPECTED_MSG =
  '알수 없는 오류 발생<br><a href="/register">회원가입으로 이동</a>';

const registerUser = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const user = client.db('kdt5').collection('user');

    const duplicatedUser = await user.findOne({ id: req.body.id });
    if (duplicatedUser) {
      return res.status(400).send(REGISTER_DUPLICATED_MSG);
    }
    await user.insertOne(req.body);
    res.status(200).send(REGISTER_SUCCES_MSG);
  } catch (err) {
    console.error(err);
    res.status(500).send(REGISTER_UNEXPECTED_MSG);
  }
};

// const userDB = {
//   //중복 회원 찾기
//   userCheck: async (userId) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       const findUser = await user.findOne({
//         id: userId,
//       });
//       return findUser;
//     } catch (err) {
//       console.error(err);
//     }
//   },

//회원 가입 하기
//   registerUser: async (newUser) => {
//     try {
//       const client = await mongoClient.connect();
//       const user = client.db('kdt5').collection('user');
//       await user.insertOne(newUser);
//       return true;
//     } catch (err) {
//       console.error(err);
//     }
//   },
// };

// module.exports = userDB;
module.exports = registerUser;
