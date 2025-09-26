"use client";

import { useState, useEffect } from "react";
import UnifiedInlineEditor from "./UnifiedInlineEditor";

import { HomePageData, HomePageContentProps } from '@/types';

export default function HomePageContent({ isAdmin }: HomePageContentProps) {
  const [data, setData] = useState<HomePageData>({
    tagline1: "",
    tagline2: "",
    tagline3: "",
    lastUpdated: ""
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/update-content?page=home");
      if (response.ok) {
        const result = await response.json();
        setData(result.data || {});
      }
    } catch (error) {
      console.error("데이터 로딩 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (field: string, newValue: string) => {
    setData((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  // 서버 사이드 렌더링 시에는 기본값만 표시 (Hydration 에러 방지)
  if (!mounted) {
    return (
      <div className="animate-fade-in-delayed space-y-2 sm:space-y-4">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light">
          브랜드의 이야기를
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
          <span className="bg-gradient-to-r from-potato-orange-light via-potato-orange to-potato-orange-dark bg-clip-text text-transparent">
            영상으로 완성하는
          </span>
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light">
          크리에이티브 스튜디오
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="animate-fade-in-delayed space-y-2 sm:space-y-4">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light">
          로딩 중...
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
          <span className="bg-gradient-to-r from-potato-orange-light via-potato-orange to-potato-orange-dark bg-clip-text text-transparent">
            로딩 중...
          </span>
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light">
          로딩 중...
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-delayed space-y-2 sm:space-y-4">
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light">
        <UnifiedInlineEditor
          value={data.tagline1 || "브랜드의 이야기를"}
          field="tagline1"
          pageName="home"
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light"
          isAdmin={isAdmin}
          onSave={(newValue) => handleSave("tagline1", newValue)}
          saveMethod="api"
        />
      </p>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
        <span className="bg-gradient-to-r from-potato-orange-light via-potato-orange to-potato-orange-dark bg-clip-text text-transparent">
          <UnifiedInlineEditor
            value={data.tagline2 || "영상으로 완성하는"}
            field="tagline2"
            pageName="home"
            className="bg-gradient-to-r from-potato-orange-light via-potato-orange to-potato-orange-dark bg-clip-text text-transparent"
            isAdmin={isAdmin}
            onSave={(newValue) => handleSave("tagline2", newValue)}
            saveMethod="api"
          />
        </span>
      </p>
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light">
        <UnifiedInlineEditor
          value={data.tagline3 || "크리에이티브 스튜디오"}
          field="tagline3"
          pageName="home"
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/95 leading-relaxed font-light"
          isAdmin={isAdmin}
          onSave={(newValue) => handleSave("tagline3", newValue)}
          saveMethod="api"
        />
      </p>
    </div>
  );
}
