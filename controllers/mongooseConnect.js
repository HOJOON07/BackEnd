const mongoose = require('mongoose');

// const { MONGO_DB_URI } = process.env;
const MONGO_DB_URI =
  'mongodb+srv://ghwns1007:kk18530529@cluster0.k9h2ww5.mongodb.net/?retryWrites=true&w=majority';

const connnect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      dbName: 'kdt5',
      useNewUrlParser: true,
    });
    console.log('mongoose connection success');
    mongoose.connection.on('error', (err) => {
      console.error('몽고 디비 연결 에러', err);
    });
    mongoose.connection.on('disconnected', () => {
      console.error('몽고 디비 연결이 끊어졌습니다. 연결을 재시도 합니다!');
      connnect();
    });
  } catch (e) {
    console.error(e);
  }
};

connnect();
module.exports = connnect;
