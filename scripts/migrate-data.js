// scripts/migrate-data.js
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// .env.local 파일에서 직접 읽기
const envPath = path.join(process.cwd(), '.env.local');
let uri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/MONGODB_URI=(.+)/);
  if (match) {
    uri = match[1].trim();
  }
}

const dbName = 'couch-potato';

if (!uri) {
  console.error('❌ MONGODB_URI 환경 변수가 설정되지 않았습니다.');
  console.error('📝 .env.local 파일에 MONGODB_URI를 설정해주세요.');
  console.error('예시: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/');
  process.exit(1);
}

console.log('✅ MongoDB URI 로드됨:', uri.substring(0, 20) + '...');

async function migrateData() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    
    console.log('MongoDB 연결 성공');
    
    // 1. Portfolio Videos 마이그레이션
    const portfolioVideosPath = path.join(process.cwd(), 'data', 'portfolio-videos.json');
    if (fs.existsSync(portfolioVideosPath)) {
      const videos = JSON.parse(fs.readFileSync(portfolioVideosPath, 'utf8'));
      await db.collection('portfolio-videos').insertMany(videos);
      console.log(`${videos.length}개의 포트폴리오 영상 마이그레이션 완료`);
    }
    
    // 2. Home Video 마이그레이션
    const homeVideoPath = path.join(process.cwd(), 'data', 'home-video.json');
    if (fs.existsSync(homeVideoPath)) {
      const homeVideo = JSON.parse(fs.readFileSync(homeVideoPath, 'utf8'));
      await db.collection('home-video').insertOne(homeVideo);
      console.log('홈페이지 영상 마이그레이션 완료');
    }
    
    // 3. Categories 마이그레이션
    const categoriesPath = path.join(process.cwd(), 'data', 'categories.json');
    if (fs.existsSync(categoriesPath)) {
      const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
      await db.collection('categories').insertMany(categories);
      console.log(`${categories.length}개의 카테고리 마이그레이션 완료`);
    }
    
    // 4. Page Content 마이그레이션
    const pages = ['home', 'about', 'contact', 'portfolio', 'process', 'location'];
    for (const page of pages) {
      const pagePath = path.join(process.cwd(), 'data', `${page}.json`);
      if (fs.existsSync(pagePath)) {
        const pageData = JSON.parse(fs.readFileSync(pagePath, 'utf8'));
        await db.collection('page-content').insertOne({
          pageName: page,
          ...pageData
        });
        console.log(`${page} 페이지 데이터 마이그레이션 완료`);
      }
    }
    
    console.log('모든 데이터 마이그레이션 완료!');
    
  } catch (error) {
    console.error('마이그레이션 오류:', error);
  } finally {
    await client.close();
  }
}

migrateData();
