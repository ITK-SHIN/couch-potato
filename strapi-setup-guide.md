# Strapi CMS 설정 가이드

## 1. Strapi 관리자 계정 생성

1. 브라우저에서 `http://localhost:1337/admin` 접속
2. 관리자 계정 생성:
   - First name: Admin
   - Last name: User
   - Email: admin@example.com
   - Password: (안전한 비밀번호 입력)
   - Confirm password: (동일한 비밀번호 입력)

## 2. 콘텐츠 타입 생성

### 2.1 Home Page 콘텐츠 타입

1. Content-Type Builder → Create new collection type
2. Display name: `Home Page`
3. API ID: `home-page`
4. Fields 추가:
   - `tagline1` (Text)
   - `tagline2` (Text)
   - `tagline3` (Text)
   - `background_image` (Media - Single)

### 2.2 Services 콘텐츠 타입

1. Content-Type Builder → Create new collection type
2. Display name: `Service`
3. API ID: `service`
4. Fields 추가:
   - `title` (Text)
   - `description` (Long text)
   - `icon` (Text)

### 2.3 Client Reviews 콘텐츠 타입

1. Content-Type Builder → Create new collection type
2. Display name: `Client Review`
3. API ID: `client-review`
4. Fields 추가:
   - `name` (Text)
   - `company` (Text)
   - `review` (Long text)

### 2.4 Portfolio 콘텐츠 타입

1. Content-Type Builder → Create new collection type
2. Display name: `Portfolio`
3. API ID: `portfolio`
4. Fields 추가:
   - `title` (Text)
   - `description` (Long text)
   - `image` (Media - Single)
   - `category` (Text)

## 3. 권한 설정

1. Settings → Users & Permissions Plugin → Roles
2. Public role 선택
3. Permissions에서 다음 항목들에 대해 `find` 권한 활성화:
   - home-page
   - service
   - client-review
   - portfolio

## 4. 샘플 데이터 입력

### Home Page 데이터

1. Content Manager → Home Page → Create new entry
2. 데이터 입력:
   - tagline1: "브랜드의 이야기를"
   - tagline2: "영상으로 완성하는"
   - tagline3: "크리에이티브 스튜디오"

### Services 데이터

각 서비스별로 Create new entry:

1. 브랜드 영상

   - title: "브랜드 영상"
   - description: "기업의 정체성과 가치를 담은 브랜드 스토리 영상"
   - icon: "🎬"

2. 광고 영상

   - title: "광고 영상"
   - description: "임팩트 있는 메시지로 고객의 마음을 사로잡는 광고"
   - icon: "📺"

3. 프로모션 영상

   - title: "프로모션 영상"
   - description: "제품과 서비스를 효과적으로 어필하는 홍보 영상"
   - icon: "🚀"

4. 이벤트 영상

   - title: "이벤트 영상"
   - description: "특별한 순간을 기록하고 공유하는 이벤트 영상"
   - icon: "🎉"

5. 교육 콘텐츠

   - title: "교육 콘텐츠"
   - description: "전문적이고 이해하기 쉬운 교육용 영상 콘텐츠"
   - icon: "📚"

6. SNS 콘텐츠
   - title: "SNS 콘텐츠"
   - description: "소셜미디어 플랫폼에 최적화된 바이럴 콘텐츠"
   - icon: "📱"

### Client Reviews 데이터

각 리뷰별로 Create new entry:

1. 김대표 리뷰

   - name: "김대표"
   - company: "테크스타트업"
   - review: "COUCH POTATO와 함께한 브랜드 영상 프로젝트는 정말 만족스러웠습니다. 우리 브랜드의 가치를 완벽하게 이해하고 구현해주었어요."

2. 이마케터 리뷰

   - name: "이마케터"
   - company: "패션브랜드"
   - review: "창의적이고 트렌디한 영상으로 우리 브랜드를 한 단계 업그레이드시켜주었습니다. 전문성과 열정이 느껴지는 팀이에요."

3. 박실장 리뷰
   - name: "박실장"
   - company: "교육기관"
   - review: "복잡한 교육 내용을 쉽고 재미있게 풀어낸 영상이 정말 인상적이었습니다. 학습 효과도 크게 향상되었어요."

## 5. 환경 변수 설정

`.env.local` 파일 생성:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
```

## 6. 서버 실행

### Strapi 서버 실행

```bash
cd strapi-cms
npm run develop
```

### Next.js 서버 실행

```bash
npm run dev
```

## 7. 테스트

1. 브라우저에서 `http://localhost:3000` 접속
2. Strapi에서 데이터 수정 후 웹사이트 새로고침하여 변경사항 확인

## 8. 관리자 접속 정보

- Strapi 관리자 패널: `http://localhost:1337/admin`
- API 엔드포인트: `http://localhost:1337/api`

## 9. 문제 해결

### Strapi 서버가 실행되지 않는 경우

1. 모든 Node.js 프로세스 종료: `taskkill /f /im node.exe`
2. Strapi 폴더에서 다시 실행: `npm run develop`
3. 포트 확인: `netstat -an | findstr :1337`

### 관리자 패널 접속이 안 되는 경우

1. 브라우저 캐시 삭제 (Ctrl+F5)
2. 다른 브라우저 시도
3. 방화벽 설정 확인
4. Strapi 서버가 정상 실행 중인지 확인
