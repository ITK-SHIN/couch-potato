import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'couch-potato';

if (!uri) {
  throw new Error('MONGODB_URI 환경 변수가 설정되지 않았습니다.');
}

// TypeScript에게 uri가 string임을 알려줌
const mongoUri: string = uri;

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(mongoUri);
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
  try {
    const { db } = await connectToDatabase();
    return db.collection(collectionName);
  } catch (error) {
    console.error(`컬렉션 ${collectionName} 접근 실패:`, error);
    throw error;
  }
}

// 연결 종료 함수
export async function closeConnection() {
  if (client) {
    await client.close();
  }
}