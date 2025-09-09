import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const { field, value, pageName } = await request.json();

    const collection = await getCollection('page-content');

    // 페이지별 데이터 업데이트
    const result = await collection.updateOne(
      { pageName: pageName || "home" },
      { 
        $set: { 
          [field]: value,
          lastUpdated: new Date().toISOString(),
          pageName: pageName || "home"
        } 
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "데이터가 성공적으로 저장되었습니다.",
    });
  } catch (error) {
    console.error("데이터 저장 오류:", error);
    return NextResponse.json(
      { 
        error: "데이터 저장 중 오류가 발생했습니다.",
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get("page") || "home";

    const collection = await getCollection('page-content');
    const data = await collection.findOne({ pageName });

    return NextResponse.json({ 
      data: data ? { ...data, _id: undefined } : {} 
    });
  } catch (error) {
    console.error("데이터 읽기 오류:", error);
    return NextResponse.json(
      { 
        error: "데이터 읽기 중 오류가 발생했습니다.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}