const connection = require('./dbConnect');

const userDB = {
  //중복 회원 찾기
  userCheck: (userId, callback) => {
    connection.query(
      `SELECT * FROM mydb1.USER WHERE USER_ID = '${userId}';`,
      (err, data) => {
        if (err) throw err;

        callback(data);
      },
    );
  },
  //회원 가입 하기
  registerUser: (newUser, callback) => {
    connection.query(
      `INSERT INTO mydb1.USER (USER_ID, PASSWORD) VALUES ('${newUser.id}','${newUser.password}');`,
      (err, data) => {
        if (err) throw err;
        callback(data);
      },
    );
  },
};

module.exports = userDB;
