"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

interface Video {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  thumbnail: string;
  videoId: string;
  videoUrl: string;
  description: string;
  order: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  order: number;
}

interface VideoManagerProps {
  isAdmin: boolean;
  onVideosChange?: (videos: Video[]) => void;
}

// 드래그 가능한 영상 아이템 컴포넌트
function SortableVideoItem({
  video,
  categories,
  onEdit,
  onDelete,
}: {
  video: Video;
  categories: Category[];
  onEdit: (video: Video) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: video.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const categoryInfo = categories.find((cat) => cat.id === video.category);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg p-4 border border-yellow-300 ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* 썸네일 */}
        <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/imgs/bg1.jpg";
            }}
          />
        </div>

        {/* 영상 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                {video.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                <span className="flex items-center gap-1">
                  {categoryInfo?.icon} {categoryInfo?.name || video.category}
                </span>
                <span>•</span>
                <span>{video.client}</span>
                <span>•</span>
                <span>{video.year}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex flex-col gap-2">
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
          <button
            onClick={() => onEdit(video)}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
            title="수정"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(video.id)}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VideoManager({
  isAdmin,
  onVideosChange,
}: VideoManagerProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9;
  const [newVideo, setNewVideo] = useState({
    title: "",
    category: "",
    client: "",
    year: new Date().getFullYear().toString(),
    thumbnail: "",
    videoId: "",
    videoUrl: "",
    description: "",
  });

  // 드래그 앤 드롭 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 영상 목록 로드
  const loadVideos = async () => {
    try {
      const response = await fetch("/api/portfolio-videos");
      if (response.ok) {
        const result = await response.json();
        setVideos(result.videos || []);
        onVideosChange?.(result.videos || []);
      }
    } catch (error) {
      console.error("영상 로딩 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 목록 로드
  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const result = await response.json();
        setCategories(result.categories || []);
      }
    } catch (error) {
      console.error("카테고리 로딩 오류:", error);
    }
  };

  useEffect(() => {
    loadVideos();
    loadCategories();
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = videos.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 드래그 앤 드롭 핸들러
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = videos.findIndex((item) => item.id === active.id);
      const newIndex = videos.findIndex((item) => item.id === over?.id);

      // 배열 순서 변경
      const newVideos = arrayMove(videos, oldIndex, newIndex);

      // order 값 업데이트
      const updatedVideos = newVideos.map((video, index) => ({
        ...video,
        order: index,
      }));

      setVideos(updatedVideos);
      onVideosChange?.(updatedVideos);

      // 서버에 순서 업데이트 저장
      try {
        await Promise.all(
          updatedVideos.map((video) =>
            fetch("/api/portfolio-videos", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: video.id,
                title: video.title,
                category: video.category,
                client: video.client,
                year: video.year,
                thumbnail: video.thumbnail,
                videoId: video.videoId,
                videoUrl: video.videoUrl,
                description: video.description,
                order: video.order,
              }),
            })
          )
        );
        console.log("영상 순서가 업데이트되었습니다.");
      } catch (error) {
        console.error("영상 순서 업데이트 오류:", error);
        alert("순서 저장 중 오류가 발생했습니다. 페이지를 새로고침해주세요.");
      }
    }
  };

  // 새 영상 추가
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.category || !newVideo.videoId) return;

    try {
      const response = await fetch("/api/portfolio-videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });

      if (response.ok) {
        setNewVideo({
          title: "",
          category: "",
          client: "",
          year: new Date().getFullYear().toString(),
          thumbnail: "",
          videoId: "",
          videoUrl: "",
          description: "",
        });
        setShowAddForm(false);
        setCurrentPage(1);
        loadVideos();
        alert("영상이 추가되었습니다!");
      } else {
        const error = await response.json();
        alert(`오류: ${error.error}`);
      }
    } catch (error) {
      console.error("영상 추가 오류:", error);
      alert("영상 추가 중 오류가 발생했습니다.");
    }
  };

  // 영상 수정
  const handleEditVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    try {
      const response = await fetch("/api/portfolio-videos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingVideo),
      });

      if (response.ok) {
        setEditingVideo(null);
        setCurrentPage(1);
        loadVideos();
        alert("영상이 수정되었습니다!");
      } else {
        const error = await response.json();
        alert(`오류: ${error.error}`);
      }
    } catch (error) {
      console.error("영상 수정 오류:", error);
      alert("영상 수정 중 오류가 발생했습니다.");
    }
  };

  // 영상 삭제
  const handleDeleteVideo = async (id: string) => {
    if (!confirm("정말로 이 영상을 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/portfolio-videos?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCurrentPage(1);
        loadVideos();
        alert("영상이 삭제되었습니다!");
      } else {
        const error = await response.json();
        alert(`오류: ${error.error}`);
      }
    } catch (error) {
      console.error("영상 삭제 오류:", error);
      alert("영상 삭제 중 오류가 발생했습니다.");
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-blue-100 border border-blue-400 rounded-lg p-4 mb-6">
        <p className="text-blue-800">영상을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-100 border border-blue-400 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-800">🎬 영상 관리</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showAddForm ? "취소" : "새 영상 추가"}
        </button>
      </div>

      {/* 영상 목록 - 드래그 앤 드롭 */}
      <div className="mb-4">
        <p className="text-sm text-blue-700 mb-3">
          💡 드래그 핸들(≡)을 잡고 드래그하여 순서를 변경할 수 있습니다
        </p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={videos.map((video) => video.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {currentVideos
                .sort((a, b) => a.order - b.order)
                .map((video) => (
                  <SortableVideoItem
                    key={video.id}
                    video={video}
                    categories={categories}
                    onEdit={setEditingVideo}
                    onDelete={handleDeleteVideo}
                  />
                ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            {/* 이전 페이지 버튼 */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              이전
            </button>

            {/* 페이지 번호들 */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-blue-800 text-white shadow-lg"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {page}
              </button>
            ))}

            {/* 다음 페이지 버튼 */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              다음
            </button>
          </div>
        )}

        {/* 페이지 정보 */}
        <div className="text-center mt-4 text-blue-700 text-sm">
          {videos.length > 0 ? (
            <>
              {startIndex + 1}-{Math.min(endIndex, videos.length)} /{" "}
              {videos.length}개 영상
            </>
          ) : (
            "등록된 영상이 없습니다."
          )}
        </div>
      </div>

      {/* 새 영상 추가 폼 */}
      {showAddForm && (
        <form
          onSubmit={handleAddVideo}
          className="bg-white rounded-lg p-4 border border-blue-300"
        >
          <h4 className="font-bold text-gray-800 mb-3">새 영상 추가</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="영상 제목 *"
              value={newVideo.title}
              onChange={(e) =>
                setNewVideo({ ...newVideo, title: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={newVideo.category}
              onChange={(e) =>
                setNewVideo({ ...newVideo, category: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">카테고리 선택 *</option>
              {categories
                .filter((cat) => cat.id !== "all")
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
            </select>
            <input
              type="text"
              placeholder="클라이언트"
              value={newVideo.client}
              onChange={(e) =>
                setNewVideo({ ...newVideo, client: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="연도"
              value={newVideo.year}
              onChange={(e) =>
                setNewVideo({ ...newVideo, year: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="YouTube 영상 ID * (예: 1CUt84BK_p0)"
              value={newVideo.videoId}
              onChange={(e) =>
                setNewVideo({ ...newVideo, videoId: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="url"
              placeholder="썸네일 URL (선택사항)"
              value={newVideo.thumbnail}
              onChange={(e) =>
                setNewVideo({ ...newVideo, thumbnail: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              placeholder="영상 URL (선택사항)"
              value={newVideo.videoUrl}
              onChange={(e) =>
                setNewVideo({ ...newVideo, videoUrl: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="영상 설명"
              value={newVideo.description}
              onChange={(e) =>
                setNewVideo({ ...newVideo, description: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

      {/* 영상 수정 폼 */}
      {editingVideo && (
        <form
          onSubmit={handleEditVideo}
          className="bg-white rounded-lg p-4 border border-blue-300 mt-4"
        >
          <h4 className="font-bold text-gray-800 mb-3">영상 수정</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="영상 제목 *"
              value={editingVideo.title}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, title: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={editingVideo.category}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, category: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">카테고리 선택 *</option>
              {categories
                .filter((cat) => cat.id !== "all")
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
            </select>
            <input
              type="text"
              placeholder="클라이언트"
              value={editingVideo.client}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, client: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="연도"
              value={editingVideo.year}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, year: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="YouTube 영상 ID *"
              value={editingVideo.videoId}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, videoId: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="url"
              placeholder="썸네일 URL"
              value={editingVideo.thumbnail}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, thumbnail: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              placeholder="영상 URL"
              value={editingVideo.videoUrl}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, videoUrl: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="영상 설명"
              value={editingVideo.description}
              onChange={(e) =>
                setEditingVideo({
                  ...editingVideo,
                  description: e.target.value,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => setEditingVideo(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
