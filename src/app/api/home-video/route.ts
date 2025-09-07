import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const HOME_VIDEO_FILE_PATH = path.join(
  process.cwd(),
  "data",
  "home-video.json"
);

// 홈페이지 영상 데이터 초기화
const initializeHomeVideo = () => {
  const defaultVideo = {
    id: "home-main-video",
    videoId: "1CUt84BK_p0",
    title: "패션을 파는 것은 어떨까요?",
    description:
      "패션 브랜드의 마케팅을 위한 창의적인 광고 영상입니다. 브랜드의 정체성과 가치를 시각적으로 표현하여 고객과의 감정적 연결을 만들어내는 작품입니다.",
    tags: [
      { id: "tag1", text: "#패션", color: "potato-orange" },
      { id: "tag2", text: "#브랜드영상", color: "clapperboard-gray" },
      { id: "tag3", text: "#대표작", color: "potato-orange-light" },
    ],
    stats: {
      views: "150K+",
      likes: "2.5K+",
    },
    client: "패션 브랜드",
    year: "2024",
    category: "commercial",
    thumbnail: "https://img.youtube.com/vi/1CUt84BK_p0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=1CUt84BK_p0",
    lastUpdated: new Date().toISOString(),
  };

  // data 디렉토리가 없으면 생성
  const dataDir = path.dirname(HOME_VIDEO_FILE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 파일이 없으면 기본 영상으로 초기화
  if (!fs.existsSync(HOME_VIDEO_FILE_PATH)) {
    fs.writeFileSync(
      HOME_VIDEO_FILE_PATH,
      JSON.stringify(defaultVideo, null, 2)
    );
  }
};

// GET: 홈페이지 영상 정보 조회
export async function GET() {
  try {
    initializeHomeVideo();

    if (!fs.existsSync(HOME_VIDEO_FILE_PATH)) {
      return NextResponse.json({ video: null });
    }

    const fileContent = fs.readFileSync(HOME_VIDEO_FILE_PATH, "utf8");
    const video = JSON.parse(fileContent);

    return NextResponse.json({ video });
  } catch (error) {
    console.error("홈페이지 영상 읽기 오류:", error);
    return NextResponse.json(
      { error: "홈페이지 영상 읽기 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// PUT: 홈페이지 영상 정보 수정
export async function PUT(request: NextRequest) {
  try {
    const {
      videoId,
      title,
      description,
      tags,
      stats,
      client,
      year,
      category,
      thumbnail,
      videoUrl,
    } = await request.json();

    if (!videoId || !title) {
      return NextResponse.json(
        { error: "영상 ID와 제목이 필요합니다." },
        { status: 400 }
      );
    }

    initializeHomeVideo();

    // 기존 영상 정보 읽기
    let video = null;
    if (fs.existsSync(HOME_VIDEO_FILE_PATH)) {
      const fileContent = fs.readFileSync(HOME_VIDEO_FILE_PATH, "utf8");
      video = JSON.parse(fileContent);
    }

    // 영상 정보 업데이트
    const updatedVideo = {
      ...video,
      videoId,
      title,
      description: description || video?.description || "",
      tags: tags || video?.tags || [],
      stats: stats || video?.stats || { views: "0", likes: "0" },
      client: client || video?.client || "",
      year: year || video?.year || new Date().getFullYear().toString(),
      category: category || video?.category || "commercial",
      thumbnail:
        thumbnail ||
        video?.thumbnail ||
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoUrl:
        videoUrl ||
        video?.videoUrl ||
        `https://www.youtube.com/watch?v=${videoId}`,
      lastUpdated: new Date().toISOString(),
    };

    // 파일에 저장
    fs.writeFileSync(
      HOME_VIDEO_FILE_PATH,
      JSON.stringify(updatedVideo, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: "홈페이지 영상이 성공적으로 업데이트되었습니다.",
      video: updatedVideo,
    });
  } catch (error) {
    console.error("홈페이지 영상 업데이트 오류:", error);
    return NextResponse.json(
      { error: "홈페이지 영상 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

