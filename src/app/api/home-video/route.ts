import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

// GET: 홈페이지 영상 정보 조회
export async function GET() {
  try {
    const collection = await getCollection('home-video');
    const video = await collection.findOne({ id: "home-main-video" });
    
    if (!video) {
      // 기본 영상 데이터 반환
      const defaultVideo = {
        id: "home-main-video",
        videoId: "1CUt84BK_p0",
        title: "패션을 파는 것은 어떨까요?",
        description: "패션 브랜드의 마케팅을 위한 창의적인 광고 영상입니다.",
        tags: [
          { id: "tag1", text: "#패션", color: "potato-orange" },
          { id: "tag2", text: "#브랜드영상", color: "clapperboard-gray" },
          { id: "tag3", text: "#대표작", color: "potato-orange-light" },
        ],
        stats: { views: "150K+", likes: "2.5K+" },
        client: "패션 브랜드",
        year: "2024",
        category: "commercial",
        thumbnail: "https://img.youtube.com/vi/1CUt84BK_p0/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=1CUt84BK_p0",
        lastUpdated: new Date().toISOString(),
      };
      
      return NextResponse.json({ video: defaultVideo });
    }

    return NextResponse.json({ video });
  } catch (error) {
    console.error("홈페이지 영상 조회 오류:", error);
    return NextResponse.json(
      { error: "홈페이지 영상 조회 중 오류가 발생했습니다." },
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

    const collection = await getCollection('home-video');

    // 영상 정보 업데이트
    const updatedVideo = {
      id: "home-main-video",
      videoId,
      title,
      description: description || "",
      tags: tags || [],
      stats: stats || { views: "0", likes: "0" },
      client: client || "",
      year: year || new Date().getFullYear().toString(),
      category: category || "commercial",
      thumbnail: thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoUrl: videoUrl || `https://www.youtube.com/watch?v=${videoId}`,
      lastUpdated: new Date().toISOString(),
    };

    // upsert 사용 (없으면 생성, 있으면 업데이트)
    await collection.replaceOne(
      { id: "home-main-video" },
      updatedVideo,
      { upsert: true }
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