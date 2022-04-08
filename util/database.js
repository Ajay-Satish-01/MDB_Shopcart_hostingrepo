const mongodb = require('mongodb');
let db;

const MongoClient = mongodb.MongoClient;
const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MDB)
    .then((client) => {
      console.log('connected');
      db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
const getDb = () => {
  if (db) return db;
  throw 'No DB found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
