import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { field, value, pageName } = await request.json();

    // 페이지별 데이터 파일 경로
    const DATA_FILE_PATH = path.join(
      process.cwd(),
      "data",
      `${pageName || "home"}.json`
    );

    // data 디렉토리가 없으면 생성
    const dataDir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 기존 데이터 읽기
    let data = {};
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf8");
      data = JSON.parse(fileContent);
    }

    // 새 데이터로 업데이트
    data = {
      ...data,
      [field]: value,
      lastUpdated: new Date().toISOString(),
    };

    // 파일에 저장
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "데이터가 성공적으로 저장되었습니다.",
      data: data,
    });
  } catch (error) {
    console.error("데이터 저장 오류:", error);
    return NextResponse.json(
      { error: "데이터 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get("page") || "home";

    // 페이지별 데이터 파일 경로
    const DATA_FILE_PATH = path.join(process.cwd(), "data", `${pageName}.json`);

    // 데이터 파일 읽기
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return NextResponse.json({ data: {} });
    }

    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf8");
    const data = JSON.parse(fileContent);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("데이터 읽기 오류:", error);
    return NextResponse.json(
      { error: "데이터 읽기 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
