"use client";

import { useState, memo, useCallback } from "react";
import { useCategories, useAddCategory, useUpdateCategory, useDeleteCategory, useUpdateCategoryOrder } from "@/hooks";
import { Category } from "@/types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CategoryManagerProps {
  isAdmin: boolean;
}

// 드래그 가능한 카테고리 아이템 컴포넌트
const SortableCategoryItem = memo(function SortableCategoryItem({
  category,
  onEdit,
  onDelete,
}: {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between bg-white rounded-lg p-3 border border-yellow-300 ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
          title="드래그하여 순서 변경"
        >
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
        <span className="text-lg">{category.icon}</span>
        <span className="font-medium text-gray-800">{category.name}</span>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          순서: {category.order}
        </span>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => onEdit(category)}
          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
          title="수정"
        >
          ✏️
        </button>
        {category.id !== "all" && (
          <button
            onClick={() => onDelete(category.id)}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
            title="삭제"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
});

const CategoryManager = memo(function CategoryManager({
  isAdmin,
}: CategoryManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "",
    order: 0,
  });

  // React Query 훅 사용
  const { data: categoriesData, isLoading, error } = useCategories();
  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const updateCategoryOrderMutation = useUpdateCategoryOrder();

  const categories = categoriesData?.categories || [];
  const loading = isLoading;

  // 드래그 앤 드롭 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 드래그 앤 드롭 핸들러
  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex((item) => item.id === active.id);
      const newIndex = categories.findIndex((item) => item.id === over?.id);

      // 배열 순서 변경
      const newCategories = arrayMove(categories, oldIndex, newIndex);

      // order 값 업데이트
      const updatedCategories = newCategories.map((category, index) => ({
        ...category,
        order: index,
      }));

      // 서버에 순서 업데이트 저장
      try {
        await updateCategoryOrderMutation.mutateAsync({ categories: updatedCategories });
        alert("카테고리 순서가 저장되었습니다!");
      } catch (error) {
        console.error("카테고리 순서 저장 오류:", error);
        alert("순서 저장 중 오류가 발생했습니다. 페이지를 새로고침해주세요.");
      }
    }
  }, [categories, updateCategoryOrderMutation]);


  // 새 카테고리 추가
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.icon) return;

    try {
      await addCategoryMutation.mutateAsync(newCategory);
      setNewCategory({ name: "", icon: "", order: 0 });
      setShowAddForm(false);
      alert("카테고리가 추가되었습니다!");
    } catch (error) {
      console.error("카테고리 추가 오류:", error);
      alert("카테고리 추가 중 오류가 발생했습니다.");
    }
  };

  // 카테고리 수정
  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      await updateCategoryMutation.mutateAsync(editingCategory);
      setEditingCategory(null);
      alert("카테고리가 수정되었습니다!");
    } catch (error) {
      console.error("카테고리 수정 오류:", error);
      alert("카테고리 수정 중 오류가 발생했습니다.");
    }
  };

  // 카테고리 삭제
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("정말로 이 카테고리를 삭제하시겠습니까?")) return;

    try {
      await deleteCategoryMutation.mutateAsync(id);
      alert("카테고리가 삭제되었습니다!");
    } catch (error) {
      console.error("카테고리 삭제 오류:", error);
      alert("카테고리 삭제 중 오류가 발생했습니다.");
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-6">
        <p className="text-yellow-800">카테고리를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 rounded-lg p-4 mb-6">
        <p className="text-red-800">
          카테고리 데이터를 불러오는데 실패했습니다. 
          {error instanceof Error ? ` (${error.message})` : ''}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-yellow-800">🎬 카테고리 관리</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          {showAddForm ? "취소" : "새 카테고리 추가"}
        </button>
      </div>

      {/* 카테고리 목록 - 드래그 앤 드롭 */}
      <div className="mb-4">
        <p className="text-sm text-yellow-700 mb-3">
          💡 드래그 핸들(≡)을 잡고 드래그하여 순서를 변경할 수 있습니다
        </p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={categories.map((cat) => cat.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {categories
                .sort((a, b) => a.order - b.order)
                .map((category) => (
                  <SortableCategoryItem
                    key={category.id}
                    category={category}
                    onEdit={setEditingCategory}
                    onDelete={handleDeleteCategory}
                  />
                ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* 새 카테고리 추가 폼 */}
      {showAddForm && (
        <form
          onSubmit={handleAddCategory}
          className="bg-white rounded-lg p-4 border border-yellow-300"
        >
          <h4 className="font-bold text-gray-800 mb-3">새 카테고리 추가</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="카테고리 이름"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="text"
              placeholder="아이콘 (이모지)"
              value={newCategory.icon}
              onChange={(e) =>
                setNewCategory({ ...newCategory, icon: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="number"
              placeholder="순서"
              value={newCategory.order}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  order: parseInt(e.target.value) || 0,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              추가
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      )}

      {/* 카테고리 수정 폼 */}
      {editingCategory && (
        <form
          onSubmit={handleEditCategory}
          className="bg-white rounded-lg p-4 border border-yellow-300 mt-4"
        >
          <h4 className="font-bold text-gray-800 mb-3">카테고리 수정</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="카테고리 이름"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, name: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="text"
              placeholder="아이콘 (이모지)"
              value={editingCategory.icon}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, icon: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="number"
              placeholder="순서"
              value={editingCategory.order}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  order: parseInt(e.target.value) || 0,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      )}
    </div>
  );
});

export default CategoryManager;
