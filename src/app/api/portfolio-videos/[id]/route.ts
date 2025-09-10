import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

// PUT: 개별 영상 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updateData = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "영상 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const collection = await getCollection("portfolio-videos");

    // ObjectId로 변환
    const { ObjectId } = await import("mongodb");
    const objectId = new ObjectId(id);

    const result = await collection.updateOne(
      { _id: objectId },
      {
        $set: {
          ...updateData,
          updatedAt: new Date().toISOString(),
        },
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

// DELETE: 개별 영상 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "영상 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const collection = await getCollection("portfolio-videos");

    // ObjectId로 변환
    const { ObjectId } = await import("mongodb");
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
