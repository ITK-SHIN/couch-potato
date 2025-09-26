"use client";

import { useState, useRef, useEffect } from "react";

export type SaveMethod = 'api' | 'localStorage' | 'strapi';

interface UnifiedInlineEditorProps {
  value: string;
  field: string;
  className?: string;
  isAdmin?: boolean;
  onSave?: (newValue: string) => void;
  
  // 저장 방법 설정
  saveMethod?: SaveMethod;
  
  // API 저장 시 필요한 props
  pageName?: string;
  endpoint?: string;
  id?: number;
  
  // 로컬 스토리지 저장 시 필요한 props
  storageKey?: string;
  
  // Strapi 저장 시 필요한 props
  strapiEndpoint?: string;
  strapiId?: number;
}

export default function UnifiedInlineEditor({
  value,
  field,
  className = "",
  isAdmin = false,
  onSave,
  saveMethod = 'api',
  pageName = "home",
  endpoint,
  id,
  storageKey = "homePageData",
  strapiEndpoint,
  strapiId,
}: UnifiedInlineEditorProps) {
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
      switch (saveMethod) {
        case 'api':
          await saveToAPI();
          break;
        case 'localStorage':
          await saveToLocalStorage();
          break;
        case 'strapi':
          await saveToStrapi();
          break;
        default:
          throw new Error(`지원하지 않는 저장 방법: ${saveMethod}`);
      }

      onSave?.(editValue);
      setIsEditing(false);
      alert("저장되었습니다!");
    } catch (error) {
      console.error("저장 중 오류:", error);
      setEditValue(value);
      alert(`저장 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const saveToAPI = async () => {
    const response = await fetch("/api/update-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field: field,
        value: editValue,
        pageName: pageName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
  };

  const saveToLocalStorage = async () => {
    const currentData = JSON.parse(
      localStorage.getItem(storageKey) || "{}"
    );
    
    const updatedData = {
      ...currentData,
      [field]: editValue,
    };

    localStorage.setItem(storageKey, JSON.stringify(updatedData));
  };

  const saveToStrapi = async () => {
    if (!strapiEndpoint || !strapiId) {
      throw new Error("Strapi 저장을 위해 endpoint와 id가 필요합니다.");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/${strapiEndpoint}/${strapiId}`,
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
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
