import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

// PUT: 영상 순서 업데이트
export async function PUT(request: NextRequest) {
  try {
    const { videos } = await request.json();

    if (!Array.isArray(videos)) {
      return NextResponse.json(
        { error: "영상 배열이 필요합니다." },
        { status: 400 }
      );
    }

    const collection = await getCollection("portfolio-videos");

    // 각 영상의 순서를 업데이트
    const updatePromises = videos.map(async (video, index) => {
      const { ObjectId } = await import("mongodb");
      const objectId = new ObjectId(video._id);

      return collection.updateOne(
        { _id: objectId },
        {
          $set: {
            order: index,
            updatedAt: new Date().toISOString(),
          },
        }
      );
    });

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: "영상 순서가 성공적으로 업데이트되었습니다.",
    });
  } catch (error) {
    console.error("영상 순서 업데이트 오류:", error);
    return NextResponse.json(
      { error: "영상 순서 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
