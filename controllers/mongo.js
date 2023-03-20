const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://ghwns1007:kk18530529@cluster0.k9h2ww5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const test = client.db('kdt5').collection('test');
  // perform actions on the collection object
  test.deleteMany({}, (deleteErr, deleteResult) => {
    if (deleteErr) throw err;
    // console.log(deleteResult);
    test.insertOne(
      {
        name: 'hojoon',
        nickName: '김호준',
      },
      (inserErr, insertResult) => {
        // console.log(insertResult);
        const findCursor = test.find({});
        findCursor.toArray((err, data) => {
          console.log(data);
        });
        // client.close();
      },
    );
  });
});
