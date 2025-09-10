import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

// PUT: 개별 카테고리 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { name, icon, order } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "카테고리 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const collection = await getCollection("categories");

    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (icon !== undefined) updateData.icon = icon;
    if (order !== undefined) updateData.order = order;

    const result = await collection.updateOne({ id }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "카테고리를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "카테고리가 성공적으로 수정되었습니다.",
    });
  } catch (error) {
    console.error("카테고리 수정 오류:", error);
    return NextResponse.json(
      { error: "카테고리 수정 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// DELETE: 개별 카테고리 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "카테고리 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const collection = await getCollection("categories");

    const result = await collection.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "카테고리를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "카테고리가 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("카테고리 삭제 오류:", error);
    return NextResponse.json(
      { error: "카테고리 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
