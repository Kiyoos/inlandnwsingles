import { MongoClient } from 'mongodb';
import 'dotenv/config';

let _db;
const client = new MongoClient(process.env.MONGODB_URI);

export async function initDb(callback) {
  console.log('initDb is called');
  if (_db) {
    console.log('DB is already initialized!');
    return callback(null, _db);
  }
  await client.connect();
  _db = client;
}

export function getDb() {
  if (!_db) {
    throw Error('DB not initialized');
  }
  console.log('getDb is called');
  return _db;
}
