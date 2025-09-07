"use client";

import { useState, useEffect } from "react";
import RealInlineEditor from "./RealInlineEditor";

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
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/update-content?page=${pageName}`);
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
