import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = 'couch-potato';

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    
    console.log('MongoDB 연결 성공');
    return { client, db };
  } catch (error) {
    console.error('MongoDB 연결 실패:', error);
    throw error;
  }
}

export async function getCollection(collectionName: string) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}

// 연결 종료 함수
export async function closeConnection() {
  if (client) {
    await client.close();
  }
}
