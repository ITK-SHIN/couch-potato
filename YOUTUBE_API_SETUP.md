# YouTube API 설정 가이드

PORTFOLIO 페이지에서 실제 YouTube 채널의 영상들을 자동으로 가져오기 위한 설정 방법입니다.

## 🔑 YouTube Data API v3 키 발급 방법

### 1. Google Cloud Console 접속

- [Google Cloud Console](https://console.cloud.google.com) 접속
- Google 계정으로 로그인

### 2. 프로젝트 생성 또는 선택

- 새 프로젝트 생성: "프로젝트 선택" → "새 프로젝트"
- 프로젝트 이름: `couch-potato-youtube` (예시)

### 3. YouTube Data API v3 활성화

- 좌측 메뉴: "API 및 서비스" → "라이브러리"
- "YouTube Data API v3" 검색
- "사용 설정" 클릭

### 4. API 키 생성

- 좌측 메뉴: "API 및 서비스" → "사용자 인증 정보"
- "+ 사용자 인증 정보 만들기" → "API 키" 선택
- 생성된 API 키 복사

### 5. API 키 제한 설정 (선택사항, 보안 강화)

- 생성된 API 키 클릭
- "애플리케이션 제한사항": "HTTP 리퍼러(웹사이트)" 선택
- 웹사이트 제한사항에 도메인 추가:
  - `localhost:3000/*` (개발용)
  - `localhost:3001/*` (개발용)
  - `yourdomain.com/*` (프로덕션용)
- "API 제한사항": "키 제한" → "YouTube Data API v3" 선택

## 🔧 프로젝트 설정

### 1. 환경 변수 파일 생성

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# .env.local
NEXT_PUBLIC_YOUTUBE_API_KEY=여기에_발급받은_API_키_입력
```

### 2. 채널 ID 확인 (필요시)

현재 `@TryToShinDirect` 핸들을 사용하고 있지만, 필요시 채널 ID로 직접 설정 가능:

1. YouTube 채널 페이지 접속
2. 페이지 소스 보기 (Ctrl+U)
3. `"channelId":"` 검색하여 ID 확인

## 📊 API 사용량 및 제한

### 할당량 정보

- **일일 할당량**: 10,000 단위 (무료)
- **채널 정보 조회**: 1 단위
- **플레이리스트 항목 조회**: 1 단위 (50개 영상당)
- **비디오 세부정보 조회**: 1 단위 (50개 영상당)

### 예상 사용량 (50개 영상 기준)

- 채널 ID 조회: 1 단위
- 업로드 플레이리스트 조회: 1 단위
- 비디오 목록 조회: 1 단위
- 비디오 세부정보 조회: 1 단위
- **총 사용량**: 약 4 단위

## 🚀 테스트 방법

### 1. 개발 서버 시작

```bash
npm run dev
```

### 2. 포트폴리오 페이지 접속

- `http://localhost:3001/portfolio`

### 3. 브라우저 콘솔 확인

- F12 → Console 탭
- API 호출 로그 확인:
  ```
  Fetching YouTube channel videos...
  Channel ID: UCxxxxxxxxxxxxx
  Uploads Playlist ID: UUxxxxxxxxxxxxx
  Found 20 videos
  Successfully formatted video data
  Loaded 20 videos from YouTube API
  ```

## ⚠️ 문제 해결

### API 키가 작동하지 않는 경우

1. API 키가 올바르게 설정되었는지 확인
2. YouTube Data API v3가 활성화되었는지 확인
3. 브라우저 콘솔에서 오류 메시지 확인
4. API 키 제한 설정이 올바른지 확인

### 폴백 데이터 사용

API가 작동하지 않아도 기본 포트폴리오 데이터가 표시됩니다:

- API 키가 설정되지 않은 경우
- API 호출이 실패한 경우
- 네트워크 오류가 발생한 경우

### 할당량 초과

- 일일 10,000 단위 초과 시 다음날까지 대기
- 또는 Google Cloud Console에서 결제 정보 추가하여 할당량 증가

## 📝 추가 기능

### 카테고리 자동 분류

영상 제목과 설명을 분석하여 자동으로 카테고리 분류:

- `wedding`: 웨딩, wedding 키워드 포함
- `commercial`: 광고, commercial, cf 키워드 포함
- `brand`: 브랜드, brand 키워드 포함
- `event`: 이벤트, event 키워드 포함
- `education`: 교육, tutorial, how to 키워드 포함
- `social`: sns, 소셜, 인스타 키워드 포함

### 클라이언트명 자동 추출

제목에서 브랜드명이나 클라이언트명 자동 추출:

- `[브랜드명]` 패턴
- `「브랜드명」` 패턴
- `(브랜드명)` 패턴
- 특정 키워드 (우지커피, 패션 등)

## 🔒 보안 주의사항

1. **API 키 보안**

   - `.env.local` 파일을 Git에 커밋하지 마세요
   - API 키를 코드에 직접 하드코딩하지 마세요

2. **도메인 제한**

   - 프로덕션에서는 반드시 HTTP 리퍼러 제한 설정
   - 필요한 도메인만 허용

3. **API 제한**
   - YouTube Data API v3만 허용하도록 설정
   - 불필요한 API 접근 차단

이제 YouTube API를 통해 실시간으로 채널의 모든 영상을 자동으로 가져와서 포트폴리오에 표시할 수 있습니다! 🎉
