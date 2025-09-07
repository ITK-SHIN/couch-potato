import axios from "axios";

// Strapi API 기본 설정
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Axios 인스턴스 생성
const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// API 토큰이 있는 경우 헤더에 추가
if (process.env.STRAPI_API_TOKEN) {
  strapiApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
}

// API 함수들
export const strapiApiClient = {
  // 홈페이지 콘텐츠 가져오기
  async getHomeContent() {
    try {
      const response = await strapiApi.get("/home-page?populate=*");
      return response.data;
    } catch (error) {
      console.error("홈페이지 콘텐츠 가져오기 실패:", error);
      return null;
    }
  },

  // 서비스 콘텐츠 가져오기
  async getServices() {
    try {
      const response = await strapiApi.get("/services?populate=*");
      return response.data;
    } catch (error) {
      console.error("서비스 콘텐츠 가져오기 실패:", error);
      return null;
    }
  },

  // 포트폴리오 콘텐츠 가져오기
  async getPortfolio() {
    try {
      const response = await strapiApi.get("/portfolios?populate=*");
      return response.data;
    } catch (error) {
      console.error("포트폴리오 콘텐츠 가져오기 실패:", error);
      return null;
    }
  },

  // About 페이지 콘텐츠 가져오기
  async getAboutContent() {
    try {
      const response = await strapiApi.get("/about-page?populate=*");
      return response.data;
    } catch (error) {
      console.error("About 페이지 콘텐츠 가져오기 실패:", error);
      return null;
    }
  },

  // 클라이언트 리뷰 가져오기
  async getClientReviews() {
    try {
      const response = await strapiApi.get("/client-reviews?populate=*");
      return response.data;
    } catch (error) {
      console.error("클라이언트 리뷰 가져오기 실패:", error);
      return null;
    }
  },

  // 이미지 URL 생성
  getImageUrl(image) {
    if (!image) return null;
    if (image.url.startsWith("http")) return image.url;
    return `${STRAPI_URL}${image.url}`;
  },

  // 콘텐츠 업데이트
  async updateContent(endpoint, id, data) {
    try {
      const response = await strapiApi.put(`/${endpoint}/${id}`, {
        data: data,
      });
      return response.data;
    } catch (error) {
      console.error("콘텐츠 업데이트 실패:", error);
      throw error;
    }
  },
};

export default strapiApiClient;
