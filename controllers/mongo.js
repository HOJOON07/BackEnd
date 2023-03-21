const { MongoClient, ServerApiVersion } = require('mongodb');
const { AstPath } = require('prettier');
const uri =
  'mongodb+srv://ghwns1007:kk18530529@cluster0.k9h2ww5.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const main = async () => {
  try {
    await client.connect();
    const dataBase = client.db('kdt5').collection('line');
    await dataBase.deleteMany({});
    await dataBase.insertMany([
      { name: '구슬기', age: 30 },
      { name: '홍성범', age: 32 },
      { name: '김호준', age: 29 },
      { name: '신상아', age: 24 },
    ]);
    await dataBase.updateMany(
      { age: { $gte: 31 } },
      { $set: { name: '업데이트 된 것' } },
    );
    await dataBase.insertOne({
      name: '김정혁',
      age: 26,
    });
    await dataBase.updateOne(
      { name: '김정혁' },
      { $set: { name: '홍성범', age: 32 } },
    );
    await dataBase.deleteOne({
      name: '신상아',
    });
    await dataBase.deleteMany({ age: { $gte: 30 } });
    // const findFunc = () => {
    //   const findCursor = dataBase.find({ age: { $gte: 25 } });
    //   findCursor.toArray((err, data) => {
    //     console.log(data);
    //   });
    // };
    // findFunc();
    const findCursor = dataBase.find({ age: { $gte: 25 } });
    const result = await findCursor.toArray();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

main();

// client.connect((err) => {
//   const dataBase = client.db('kdt5').collection('line');
//   dataBase.deleteMany({}, (dErr, dRes) => {
//     if (dErr) throw dErr;
//     dataBase.insertMany(
//       [
//         {
//           name: '구슬기',
//           age: 30,
//         },
//         {
//           name: '홍성범',
//           age: 32,
//         },
//         {
//           name: '김호준',
//           age: 29,
//         },
//         {
//           name: '신상아',
//           age: 24,
//         },
//       ],
//       (iErr, iRes) => {
//         if (iErr) throw iErr;
//         dataBase.insertOne({ name: '김정혁', age: 26 }, (oneErr, oneRes) => {
//           if (oneErr) throw oneErr;
//           dataBase.deleteOne({ name: '신상아' }, (doneErr, doneRes) => {
//             if (doneErr) throw doneErr;
//             dataBase.updateOne(
//               { name: '김정혁' },
//               { $set: { name: '홍성범', age: 32 } },
//               (upErr, upRes) => {
//                 if (upErr) throw upErr;
//                 const findCursor = dataBase.find({ age: { $gte: 25 } });
//                 findCursor.toArray((err, data) => {
//                   console.log(data);
//                 });
//               },
//             );
//           });
//         });
//       },
//     );
//   });
// });

// 32, 24
