import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

// GET: 포트폴리오 영상 목록 조회
export async function GET() {
  try {
    const collection = await getCollection('portfolio-videos');
    const videos = await collection.find({}).sort({ order: 1 }).toArray();
    
    return NextResponse.json({ videos });
  } catch (error) {
    console.error("영상 조회 오류:", error);
    return NextResponse.json(
      { error: "영상 조회 중 오류가 발생했습니다." },
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

    const collection = await getCollection('portfolio-videos');

    // 기존 영상들의 order 값을 1씩 증가시켜 순서 조정
    await collection.updateMany({}, { $inc: { order: 1 } });

    // 새 영상 추가 (order: 0으로 설정하여 가장 첫 번째로)
    const newVideo = {
      title,
      category,
      client: client || "",
      year: year || new Date().getFullYear().toString(),
      thumbnail: thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoId,
      videoUrl: videoUrl || `https://www.youtube.com/watch?v=${videoId}`,
      description: description || "",
      order: 0,
      createdAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(newVideo);

    return NextResponse.json({
      success: true,
      message: "영상이 성공적으로 추가되었습니다.",
      video: { ...newVideo, id: result.insertedId.toString() },
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
    const videoData = await request.json();
    const { id, ...updateData } = videoData;

    if (!id) {
      return NextResponse.json(
        { error: "영상 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const collection = await getCollection('portfolio-videos');
    
    // ObjectId로 변환
    const { ObjectId } = await import('mongodb');
    const objectId = new ObjectId(id);

    const result = await collection.updateOne(
      { _id: objectId },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date().toISOString() 
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "영상을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "영상이 성공적으로 수정되었습니다.",
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

    const collection = await getCollection('portfolio-videos');
    
    // ObjectId로 변환
    const { ObjectId } = await import('mongodb');
    const objectId = new ObjectId(id);

    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "영상을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "영상이 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("영상 삭제 오류:", error);
    return NextResponse.json(
      { error: "영상 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}