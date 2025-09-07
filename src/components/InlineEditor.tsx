"use client";

import { useState, useRef, useEffect } from "react";
import { strapiApiClient } from "@/utils/strapi";

interface InlineEditorProps {
  value: string;
  field: string;
  endpoint: string;
  id?: number;
  className?: string;
  isAdmin?: boolean;
  onSave?: (newValue: string) => void;
}

export default function InlineEditor({
  value,
  field,
  endpoint,
  id,
  className = "",
  isAdmin = false,
  onSave,
}: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      // Strapi API로 데이터 업데이트
      const response = await fetch(
        `http://localhost:1337/api/${endpoint}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              [field]: editValue,
            },
          }),
        }
      );

      if (response.ok) {
        // 성공 시 부모 컴포넌트에 새 값 전달
        onSave?.(editValue);
        setIsEditing(false);
        alert("저장되었습니다! 페이지를 새로고침합니다.");
        // 페이지 새로고침으로 변경사항 반영
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("저장 실패:", response.statusText, errorData);
        setEditValue(value); // 원래 값으로 복원
        alert(
          `저장에 실패했습니다. (${response.status}): ${
            errorData.error?.message || "권한을 확인해주세요."
          }`
        );
      }
    } catch (error) {
      console.error("저장 중 오류:", error);
      setEditValue(value); // 원래 값으로 복원
      alert(
        "저장 중 오류가 발생했습니다. Strapi 서버가 실행 중인지 확인해주세요."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleClick = () => {
    if (isAdmin && !isEditing) {
      setIsEditing(true);
    }
  };

  if (!isAdmin) {
    return <span className={className}>{value}</span>;
  }

  if (isEditing) {
    return (
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`${className} bg-yellow-100 border-2 border-yellow-400 rounded px-2 py-1 outline-none`}
          disabled={isSaving}
        />
        {isSaving && (
          <div className="absolute -top-8 left-0 bg-gray-800 text-white px-2 py-1 rounded text-xs">
            저장 중...
          </div>
        )}
      </div>
    );
  }

  return (
    <span
      className={`${className} cursor-pointer hover:bg-yellow-100 hover:border-b-2 hover:border-yellow-400 transition-all duration-200 px-1 rounded`}
      onClick={handleClick}
      title="클릭하여 편집"
    >
      {value}
    </span>
  );
}
