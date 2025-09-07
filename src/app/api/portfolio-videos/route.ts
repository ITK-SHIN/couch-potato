import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const VIDEOS_FILE_PATH = path.join(
  process.cwd(),
  "data",
  "portfolio-videos.json"
);

// 영상 데이터 초기화
const initializeVideos = () => {
  const defaultVideos = [
    {
      id: "1",
      title: "패션을 파는 것은 어떨까요?",
      category: "commercial",
      client: "패션 브랜드",
      year: "2024",
      thumbnail: "https://img.youtube.com/vi/1CUt84BK_p0/maxresdefault.jpg",
      videoId: "1CUt84BK_p0",
      videoUrl: "https://www.youtube.com/watch?v=1CUt84BK_p0",
      description: "패션 브랜드의 마케팅을 위한 창의적인 광고 영상",
      order: 0,
    },
    {
      id: "2",
      title: "이 영상은 우지커피 광고 영상입니다.",
      category: "commercial",
      client: "우지커피",
      year: "2024",
      thumbnail: "https://img.youtube.com/vi/__Jx8hdRy3w/maxresdefault.jpg",
      videoId: "__Jx8hdRy3w",
      videoUrl: "https://www.youtube.com/watch?v=__Jx8hdRy3w",
      description: "우지커피 브랜드를 위한 프로모션 광고 영상",
      order: 1,
    },
    {
      id: "3",
      title: "드라마틱 웨딩 세리머니",
      category: "wedding",
      client: "신혼 커플 C",
      year: "2024",
      thumbnail: "/imgs/bg1.jpg",
      videoId: "ScMzIvxBSi4",
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "감성 넘치는 웨딩 세리머니의 모든 순간",
      order: 2,
    },
    {
      id: "4",
      title: "야외 웨딩 하이라이트",
      category: "wedding",
      client: "신혼 커플 D",
      year: "2024",
      thumbnail: "/imgs/about.jpg",
      videoId: "astISOttCQ0",
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "자연 속에서 펼쳐진 아름다운 야외 웨딩",
      order: 3,
    },
    {
      id: "5",
      title: "클래식 웨딩 다큐멘터리",
      category: "wedding",
      client: "신혼 커플 E",
      year: "2023",
      thumbnail: "/imgs/about2.jpg",
      videoId: "oHg5SJYRHA0",
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "고전적이고 우아한 웨딩의 완벽한 기록",
      order: 4,
    },
    {
      id: "6",
      title: "비하인드 메이킹 영상",
      category: "education",
      client: "COUCH POTATO",
      year: "2024",
      thumbnail: "/imgs/about3.jpg",
      videoId: "M7lc1UVf-VE",
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "웨딩 촬영 현장의 생생한 비하인드 스토리",
      order: 5,
    },
    {
      id: "7",
      title: "브랜딩 영상 제작기",
      category: "brand",
      client: "로컬 브랜드",
      year: "2024",
      thumbnail: "/imgs/1.jpg",
      videoId: "fJ9rUzIMcZQ",
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "브랜드의 정체성을 담은 창의적인 영상 제작 과정",
      order: 6,
    },
    {
      id: "8",
      title: "이벤트 촬영 하이라이트",
      category: "event",
      client: "이벤트 기획사",
      year: "2023",
      thumbnail: "/imgs/2.jpg",
      videoId: "QH2-TGUlwu4",
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "특별한 순간들을 포착한 이벤트 영상",
      order: 7,
    },
    {
      id: "9",
      title: "촬영 장비 리뷰",
      category: "education",
      client: "COUCH POTATO",
      year: "2023",
      thumbnail: "/imgs/about.jpg",
      videoId: "xvFZjo5PgG0",
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "프로 영상 제작을 위한 장비 소개 및 활용법",
      order: 8,
    },
    {
      id: "10",
      title: "SNS 콘텐츠 제작",
      category: "social",
      client: "인플루언서",
      year: "2024",
      thumbnail: "/imgs/about2.jpg",
      videoId: "Ks-_Mh1QhMc",
      videoUrl: "https://www.youtube.com/@TryToShinDirect",
      description: "트렌디한 SNS 콘텐츠 제작 노하우",
      order: 9,
    },
  ];

  // data 디렉토리가 없으면 생성
  const dataDir = path.dirname(VIDEOS_FILE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 파일이 없으면 기본 영상으로 초기화
  if (!fs.existsSync(VIDEOS_FILE_PATH)) {
    fs.writeFileSync(VIDEOS_FILE_PATH, JSON.stringify(defaultVideos, null, 2));
  }
};

// GET: 영상 목록 조회
export async function GET() {
  try {
    initializeVideos();

    if (!fs.existsSync(VIDEOS_FILE_PATH)) {
      return NextResponse.json({ videos: [] });
    }

    const fileContent = fs.readFileSync(VIDEOS_FILE_PATH, "utf8");
    const videos = JSON.parse(fileContent);

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("영상 읽기 오류:", error);
    return NextResponse.json(
      { error: "영상 읽기 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// POST: 새 영상 추가
export async function POST(request: NextRequest) {
  try {
    const {
      title,
      category,
      client,
      year,
      thumbnail,
      videoId,
      videoUrl,
      description,
    } = await request.json();

    if (!title || !category || !videoId) {
      return NextResponse.json(
        { error: "제목, 카테고리, 영상 ID가 필요합니다." },
        { status: 400 }
      );
    }

    initializeVideos();

    // 기존 영상 읽기
    let videos = [];
    if (fs.existsSync(VIDEOS_FILE_PATH)) {
      const fileContent = fs.readFileSync(VIDEOS_FILE_PATH, "utf8");
      videos = JSON.parse(fileContent);
    }

    // 새 영상 ID 생성
    const newId = Date.now().toString();
    const newOrder = videos.length;

    // 새 영상 추가
    const newVideo = {
      id: newId,
      title,
      category,
      client: client || "",
      year: year || new Date().getFullYear().toString(),
      thumbnail:
        thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoId,
      videoUrl: videoUrl || `https://www.youtube.com/watch?v=${videoId}`,
      description: description || "",
      order: newOrder,
    };

    videos.push(newVideo);

    // 파일에 저장
    fs.writeFileSync(VIDEOS_FILE_PATH, JSON.stringify(videos, null, 2));

    return NextResponse.json({
      success: true,
      message: "영상이 성공적으로 추가되었습니다.",
      video: newVideo,
    });
  } catch (error) {
    console.error("영상 추가 오류:", error);
    return NextResponse.json(
      { error: "영상 추가 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// PUT: 영상 수정
export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      title,
      category,
      client,
      year,
      thumbnail,
      videoId,
      videoUrl,
      description,
      order,
    } = await request.json();

    if (!id || !title || !category || !videoId) {
      return NextResponse.json(
        { error: "ID, 제목, 카테고리, 영상 ID가 필요합니다." },
        { status: 400 }
      );
    }

    initializeVideos();

    // 기존 영상 읽기
    let videos = [];
    if (fs.existsSync(VIDEOS_FILE_PATH)) {
      const fileContent = fs.readFileSync(VIDEOS_FILE_PATH, "utf8");
      videos = JSON.parse(fileContent);
    }

    // 영상 찾기 및 수정
    const videoIndex = videos.findIndex((video: any) => video.id === id);
    if (videoIndex === -1) {
      return NextResponse.json(
        { error: "영상을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 영상 수정
    videos[videoIndex] = {
      ...videos[videoIndex],
      title,
      category,
      client: client || videos[videoIndex].client,
      year: year || videos[videoIndex].year,
      thumbnail: thumbnail || videos[videoIndex].thumbnail,
      videoId,
      videoUrl: videoUrl || videos[videoIndex].videoUrl,
      description: description || videos[videoIndex].description,
      order: order !== undefined ? order : videos[videoIndex].order,
    };

    // 파일에 저장
    fs.writeFileSync(VIDEOS_FILE_PATH, JSON.stringify(videos, null, 2));

    return NextResponse.json({
      success: true,
      message: "영상이 성공적으로 수정되었습니다.",
      video: videos[videoIndex],
    });
  } catch (error) {
    console.error("영상 수정 오류:", error);
    return NextResponse.json(
      { error: "영상 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// DELETE: 영상 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "영상 ID가 필요합니다." },
        { status: 400 }
      );
    }

    initializeVideos();

    // 기존 영상 읽기
    let videos = [];
    if (fs.existsSync(VIDEOS_FILE_PATH)) {
      const fileContent = fs.readFileSync(VIDEOS_FILE_PATH, "utf8");
      videos = JSON.parse(fileContent);
    }

    // 영상 찾기 및 삭제
    const videoIndex = videos.findIndex((video: any) => video.id === id);
    if (videoIndex === -1) {
      return NextResponse.json(
        { error: "영상을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const deletedVideo = videos[videoIndex];
    videos.splice(videoIndex, 1);

    // order 값 재정렬
    videos = videos.map((video: any, index: number) => ({
      ...video,
      order: index,
    }));

    // 파일에 저장
    fs.writeFileSync(VIDEOS_FILE_PATH, JSON.stringify(videos, null, 2));

    return NextResponse.json({
      success: true,
      message: "영상이 성공적으로 삭제되었습니다.",
      video: deletedVideo,
    });
  } catch (error) {
    console.error("영상 삭제 오류:", error);
    return NextResponse.json(
      { error: "영상 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

