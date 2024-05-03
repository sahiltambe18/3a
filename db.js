const mongodb = require('mongodb');
// const dotenv=require("dotenv").config()

const MongoClient = mongodb.MongoClient;

 let mongodbUrl = 'mongodb+srv://sahiltambe81922:zXBi39zjmnxxKErw@cluster0.hyfxdtl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';





let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(
    mongodbUrl
    );
    database = client.db('online-store');
}

function getDb() {
  if (!database) {
    throw { message: 'You must connect first!' };
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};