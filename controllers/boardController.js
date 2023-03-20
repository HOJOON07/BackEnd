const connection = require('./dbConnect');

const boardDB = {
  //모든 게시글 가져오기
  getAllArticles: (callback) => {
    connection.query('select * from mydb1.board', (err, data) => {
      if (err) throw err;

      callback(data);
    });
  },
  //게시글 추가하기
  writeArticle: (newArticle, callback) => {
    connection.query(
      `INSERT INTO mydb1.board (TITLE, CONTENT,USERID) VALUES ('${newArticle.title}','${newArticle.content}','${newArticle.id}');`,
      (err, data) => {
        if (err) throw err;
        callback(data);
      },
    );
  },

  //특정 ID값을 가지는 게시글
  getArticle: (id, callback) => {
    connection.query(
      `select * from mydb1.board WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        callback(data);
      },
    );
  },
  modifyArticle: (id, modifyArticle, callback) => {
    connection.query(
      `UPDATE mydb1.board SET TITLE = '${modifyArticle.title}', CONTENT = '${modifyArticle.content}' WHERE ID_PK = ${id};`,
      (err, data) => {
        if (err) throw err;
        callback(data);
      },
    );
  },
  deleteArticle: (id, callback) => {
    connection.query(
      `DELETE from mydb1.board where id_pk = ${id};`,
      (err, data) => {
        if (err) throw err;
        callback(data);
      },
    );
  },
};

module.exports = boardDB;
