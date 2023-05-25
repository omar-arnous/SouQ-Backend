const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

const connectToDB = async () => {
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
  console.log('Connected to MongooseDB');
  database = client.db('online-shop');
};

const getDB = () => {
  if (!database) {
    throw new Error('You must connect to db first');
  }

  return database;
};

module.exports = {
  connectToDB: connectToDB,
  getDB: getDB,
};
