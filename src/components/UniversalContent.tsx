"use client";

import { useState, useEffect } from "react";
import RealInlineEditor from "./RealInlineEditor";
import { useUniversalContent, useUpdateUniversalContent } from "@/hooks/useUniversalContent";

interface UniversalContentProps {
  isAdmin: boolean;
  pageName: string;
  fields: {
    [key: string]: {
      value: string;
      className: string;
    };
  };
}

export default function UniversalContent({
  isAdmin,
  pageName,
  fields,
}: UniversalContentProps) {
  const [mounted, setMounted] = useState(false);

  // React Query 훅 사용
  const { data: contentData, isLoading, error } = useUniversalContent(pageName);
  const updateContentMutation = useUpdateUniversalContent(pageName);

  const data = contentData?.data || {};
  const loading = isLoading;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = async (field: string, newValue: string) => {
    try {
      await updateContentMutation.mutateAsync({ field, value: newValue });
    } catch (error) {
      console.error("콘텐츠 저장 오류:", error);
    }
  };

  // 서버 사이드 렌더링 시에는 기본값만 표시 (Hydration 에러 방지)
  if (!mounted) {
    return (
      <>
        {Object.entries(fields).map(([key, field]) => (
          <span key={key} className={field.className}>
            {field.value}
          </span>
        ))}
      </>
    );
  }

  if (loading) {
    return (
      <>
        {Object.entries(fields).map(([key, field]) => (
          <span key={key} className={field.className}>
            로딩 중...
          </span>
        ))}
      </>
    );
  }

  if (error) {
    return (
      <>
        {Object.entries(fields).map(([key, field]) => (
          <span key={key} className={field.className}>
            {field.value} {/* 에러 시 기본값 표시 */}
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      {Object.entries(fields).map(([key, field]) => (
        <span key={key} className={field.className}>
          <RealInlineEditor
            value={data[key] || field.value}
            field={key}
            pageName={pageName}
            className={field.className}
            isAdmin={isAdmin}
            onSave={(newValue) => handleSave(key, newValue)}
          />
        </span>
      ))}
    </>
  );
}
