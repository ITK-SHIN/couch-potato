import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

// PUT: 카테고리 순서 업데이트
export async function PUT(request: NextRequest) {
  try {
    const { categories } = await request.json();

    if (!Array.isArray(categories)) {
      return NextResponse.json(
        { error: "카테고리 배열이 필요합니다." },
        { status: 400 }
      );
    }

    const collection = await getCollection("categories");

    // 각 카테고리의 순서를 업데이트
    const updatePromises = categories.map((category, index) =>
      collection.updateOne(
        { id: category.id },
        {
          $set: {
            order: index,
            updatedAt: new Date().toISOString(),
          },
        }
      )
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: "카테고리 순서가 성공적으로 업데이트되었습니다.",
    });
  } catch (error) {
    console.error("카테고리 순서 업데이트 오류:", error);
    return NextResponse.json(
      { error: "카테고리 순서 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
