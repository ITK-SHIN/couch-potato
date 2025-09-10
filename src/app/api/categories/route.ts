import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

// GET: 카테고리 목록 조회
export async function GET() {
  try {
    const collection = await getCollection("categories");
    const categories = await collection.find({}).sort({ order: 1 }).toArray();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("카테고리 조회 오류:", error);
    return NextResponse.json(
      { error: "카테고리 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// POST: 새 카테고리 추가
export async function POST(request: NextRequest) {
  try {
    const { name, icon, order } = await request.json();

    if (!name || !icon) {
      return NextResponse.json(
        { error: "카테고리 이름과 아이콘이 필요합니다." },
        { status: 400 }
      );
    }

    const collection = await getCollection("categories");

    // 새 카테고리 ID 생성
    const newId = name.toLowerCase().replace(/\s+/g, "_");
    const existingIds = await collection.distinct("id");
    let finalId = newId;
    let counter = 1;
    while (existingIds.includes(finalId)) {
      finalId = `${newId}_${counter}`;
      counter++;
    }

    // 새 카테고리 추가
    const newCategory = {
      id: finalId,
      name,
      icon,
      order: order || (await collection.countDocuments()),
    };

    await collection.insertOne(newCategory);

    return NextResponse.json({
      success: true,
      message: "카테고리가 성공적으로 추가되었습니다.",
      category: newCategory,
    });
  } catch (error) {
    console.error("카테고리 추가 오류:", error);
    return NextResponse.json(
      { error: "카테고리 추가 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// PUT: 카테고리 수정
export async function PUT(request: NextRequest) {
  try {
    const { id, name, icon, order } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "카테고리 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const collection = await getCollection("categories");

    const result = await collection.updateOne(
      { id },
      {
        $set: {
          ...(name && { name }),
          ...(icon && { icon }),
          ...(order !== undefined && { order }),
          updatedAt: new Date().toISOString(),
        },
      }
    );

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

// DELETE: 카테고리 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

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
