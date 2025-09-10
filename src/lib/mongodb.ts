import { MongoClient, Db } from "mongodb";

// MongoDB 연결 설정
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = "couch-potato";
const USE_JSON_FALLBACK = false; // MongoDB 사용

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000, // 5초 타임아웃
      connectTimeoutMS: 10000, // 10초 연결 타임아웃
      socketTimeoutMS: 45000, // 45초 소켓 타임아웃
      maxPoolSize: 10, // 최대 연결 풀 크기
      retryWrites: true,
      retryReads: true,
    });
    await client.connect();
    db = client.db(dbName);

    console.log("MongoDB 연결 성공");
    return { client, db };
  } catch (error) {
    console.error("MongoDB 연결 실패:", error);

    // MongoDB Atlas 연결 실패 시 로컬 MongoDB 시도
    if (uri.includes("mongodb+srv://")) {
      console.log("MongoDB Atlas 연결 실패, 로컬 MongoDB 시도 중...");
      try {
        const localUri = "mongodb://localhost:27017";
        client = new MongoClient(localUri, {
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 10000,
          socketTimeoutMS: 45000,
          maxPoolSize: 10,
          retryWrites: true,
          retryReads: true,
        });
        await client.connect();
        db = client.db(dbName);
        console.log("로컬 MongoDB 연결 성공");
        return { client, db };
      } catch (localError) {
        console.error("로컬 MongoDB 연결도 실패:", localError);
      }
    }

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
