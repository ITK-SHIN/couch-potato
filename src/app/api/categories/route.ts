import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CATEGORIES_FILE_PATH = path.join(
  process.cwd(),
  "data",
  "categories.json"
);

// 카테고리 데이터 초기화
const initializeCategories = () => {
  const defaultCategories = [
    { id: "all", name: "전체", icon: "🎬", order: 0 },
    { id: "youtube", name: "YouTube", icon: "📹", order: 1 },
    { id: "wedding", name: "웨딩", icon: "💒", order: 2 },
    { id: "brand", name: "브랜드", icon: "🏢", order: 3 },
    { id: "commercial", name: "광고", icon: "📺", order: 4 },
    { id: "corporate", name: "기업홍보", icon: "🏭", order: 5 },
    { id: "event", name: "이벤트", icon: "🎉", order: 6 },
    { id: "education", name: "교육", icon: "📚", order: 7 },
    { id: "social", name: "소셜미디어", icon: "📱", order: 8 },
  ];

  // data 디렉토리가 없으면 생성
  const dataDir = path.dirname(CATEGORIES_FILE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 파일이 없으면 기본 카테고리로 초기화
  if (!fs.existsSync(CATEGORIES_FILE_PATH)) {
    fs.writeFileSync(
      CATEGORIES_FILE_PATH,
      JSON.stringify(defaultCategories, null, 2)
    );
  }
};

// GET: 카테고리 목록 조회
export async function GET() {
  try {
    initializeCategories();

    if (!fs.existsSync(CATEGORIES_FILE_PATH)) {
      return NextResponse.json({ categories: [] });
    }

    const fileContent = fs.readFileSync(CATEGORIES_FILE_PATH, "utf8");
    const categories = JSON.parse(fileContent);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("카테고리 읽기 오류:", error);
    return NextResponse.json(
      { error: "카테고리 읽기 중 오류가 발생했습니다." },
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

    initializeCategories();

    // 기존 카테고리 읽기
    let categories = [];
    if (fs.existsSync(CATEGORIES_FILE_PATH)) {
      const fileContent = fs.readFileSync(CATEGORIES_FILE_PATH, "utf8");
      categories = JSON.parse(fileContent);
    }

    // 새 카테고리 ID 생성 (기존 ID와 중복되지 않도록)
    const newId = name.toLowerCase().replace(/\s+/g, "_");
    const existingIds = categories.map((cat: any) => cat.id);
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
      order: order || categories.length,
    };

    categories.push(newCategory);

    // 파일에 저장
    fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2));

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

    if (!id || !name || !icon) {
      return NextResponse.json(
        { error: "카테고리 ID, 이름, 아이콘이 필요합니다." },
        { status: 400 }
      );
    }

    initializeCategories();

    // 기존 카테고리 읽기
    let categories = [];
    if (fs.existsSync(CATEGORIES_FILE_PATH)) {
      const fileContent = fs.readFileSync(CATEGORIES_FILE_PATH, "utf8");
      categories = JSON.parse(fileContent);
    }

    // 카테고리 찾기 및 수정
    const categoryIndex = categories.findIndex((cat: any) => cat.id === id);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: "카테고리를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // "전체" 카테고리는 수정 불가
    if (id === "all") {
      return NextResponse.json(
        { error: "전체 카테고리는 수정할 수 없습니다." },
        { status: 400 }
      );
    }

    // 카테고리 수정
    categories[categoryIndex] = {
      ...categories[categoryIndex],
      name,
      icon,
      order: order !== undefined ? order : categories[categoryIndex].order,
    };

    // 파일에 저장
    fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2));

    return NextResponse.json({
      success: true,
      message: "카테고리가 성공적으로 수정되었습니다.",
      category: categories[categoryIndex],
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

    // "전체" 카테고리는 삭제 불가
    if (id === "all") {
      return NextResponse.json(
        { error: "전체 카테고리는 삭제할 수 없습니다." },
        { status: 400 }
      );
    }

    initializeCategories();

    // 기존 카테고리 읽기
    let categories = [];
    if (fs.existsSync(CATEGORIES_FILE_PATH)) {
      const fileContent = fs.readFileSync(CATEGORIES_FILE_PATH, "utf8");
      categories = JSON.parse(fileContent);
    }

    // 카테고리 찾기 및 삭제
    const categoryIndex = categories.findIndex((cat: any) => cat.id === id);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: "카테고리를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const deletedCategory = categories[categoryIndex];
    categories.splice(categoryIndex, 1);

    // 파일에 저장
    fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2));

    return NextResponse.json({
      success: true,
      message: "카테고리가 성공적으로 삭제되었습니다.",
      category: deletedCategory,
    });
  } catch (error) {
    console.error("카테고리 삭제 오류:", error);
    return NextResponse.json(
      { error: "카테고리 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

