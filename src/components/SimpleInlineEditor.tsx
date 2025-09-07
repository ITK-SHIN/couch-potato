"use client";

import { useState, useRef, useEffect } from "react";

interface SimpleInlineEditorProps {
  value: string;
  className?: string;
  isAdmin?: boolean;
  onSave?: (newValue: string) => void;
}

export default function SimpleInlineEditor({
  value,
  className = "",
  isAdmin = false,
  onSave,
}: SimpleInlineEditorProps) {
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

    // 로컬 스토리지에 저장 (즉시 반영)
    try {
      const currentData = JSON.parse(
        localStorage.getItem("homePageData") || "{}"
      );
      const updatedData = {
        ...currentData,
        tagline1: editValue.includes("브랜드")
          ? editValue
          : currentData.tagline1,
        tagline2: editValue.includes("영상") ? editValue : currentData.tagline2,
        tagline3: editValue.includes("크리에이티브")
          ? editValue
          : currentData.tagline3,
      };

      // 어떤 필드인지 판단하여 저장
      if (value.includes("브랜드")) {
        updatedData.tagline1 = editValue;
      } else if (value.includes("영상")) {
        updatedData.tagline2 = editValue;
      } else if (value.includes("크리에이티브")) {
        updatedData.tagline3 = editValue;
      }

      localStorage.setItem("homePageData", JSON.stringify(updatedData));

      // 부모 컴포넌트에 새 값 전달
      onSave?.(editValue);
      setIsEditing(false);

      // 성공 메시지
      alert("저장되었습니다!");
    } catch (error) {
      console.error("저장 중 오류:", error);
      setEditValue(value); // 원래 값으로 복원
      alert("저장 중 오류가 발생했습니다.");
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
