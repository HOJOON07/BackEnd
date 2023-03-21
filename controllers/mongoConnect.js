const { MongoClient, ServerApiVersion } = require('mongodb');
const { AstPath } = require('prettier');
const uri =
  'mongodb+srv://ghwns1007:kk18530529@cluster0.k9h2ww5.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = client;
