"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useHomeVideo, useUpdateHomeVideo } from "@/hooks";

interface HomeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  tags: Array<{
    id: string;
    text: string;
    color: string;
  }>;
  stats: {
    views: string;
    likes: string;
  };
  client: string;
  year: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  lastUpdated: string;
}

interface HomeVideoManagerProps {
  isAdmin: boolean;
  onVideoChange?: (video: HomeVideo) => void;
}

export default function HomeVideoManager({
  isAdmin,
  onVideoChange,
}: HomeVideoManagerProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<HomeVideo | null>(null);

  // React Query 훅 사용
  const { data: homeVideoData, isLoading, error } = useHomeVideo();
  const updateHomeVideoMutation = useUpdateHomeVideo();

  const video = homeVideoData?.video || null;
  const loading = isLoading;

  // 비디오 데이터가 변경될 때마다 부모 컴포넌트에 알림
  React.useEffect(() => {
    if (video && onVideoChange) {
      onVideoChange(video);
    }
  }, [video, onVideoChange]);

  // 영상 수정
  const handleEditVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    try {
      await updateHomeVideoMutation.mutateAsync(editingVideo);
      setEditingVideo(null);
      setShowEditForm(false);
      alert("홈페이지 영상이 수정되었습니다!");
    } catch (error) {
      console.error("홈페이지 영상 수정 오류:", error);
      alert("홈페이지 영상 수정 중 오류가 발생했습니다.");
    }
  };

  // 태그 추가
  const addTag = () => {
    if (!editingVideo) return;
    const newTag = {
      id: Date.now().toString(),
      text: "#새태그",
      color: "potato-orange",
    };
    setEditingVideo({
      ...editingVideo,
      tags: [...editingVideo.tags, newTag],
    });
  };

  // 태그 삭제
  const removeTag = (tagId: string) => {
    if (!editingVideo) return;
    setEditingVideo({
      ...editingVideo,
      tags: editingVideo.tags.filter((tag) => tag.id !== tagId),
    });
  };

  // 태그 수정
  const updateTag = (tagId: string, field: string, value: string) => {
    if (!editingVideo) return;
    setEditingVideo({
      ...editingVideo,
      tags: editingVideo.tags.map((tag) =>
        tag.id === tagId ? { ...tag, [field]: value } : tag
      ),
    });
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-green-100 border border-green-400 rounded-lg p-4 mb-6">
        <p className="text-green-800">홈페이지 영상을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 rounded-lg p-4 mb-6">
        <p className="text-red-800">
          홈페이지 영상을 불러오는데 실패했습니다. 
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
    <div className="bg-green-100 border border-green-400 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-green-800">
          🏠 홈페이지 영상 관리
        </h3>
        <button
          onClick={() => {
            setEditingVideo(video);
            setShowEditForm(!showEditForm);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {showEditForm ? "취소" : "영상 수정"}
        </button>
      </div>

      {/* 현재 영상 정보 */}
      {video && !showEditForm && (
        <div className="bg-white rounded-lg p-4 border border-green-300">
          <div className="flex items-start gap-4">
            {/* 썸네일 */}
            <div className="w-32 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
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
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-lg mb-2">
                {video.title}
              </h4>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span>📅 {video.year}</span>
                <span>🏢 {video.client}</span>
                <span>📊 {video.stats.views} 조회수</span>
                <span>❤️ {video.stats.likes} 좋아요</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {video.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`px-2 py-1 text-xs font-bold rounded-full ${
                      tag.color === "potato-orange"
                        ? "bg-orange-500 text-white"
                        : tag.color === "clapperboard-gray"
                        ? "bg-gray-500 text-white"
                        : "bg-orange-300 text-white"
                    }`}
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 영상 수정 폼 */}
      {showEditForm && editingVideo && (
        <form
          onSubmit={handleEditVideo}
          className="bg-white rounded-lg p-4 border border-green-300"
        >
          <h4 className="font-bold text-gray-800 mb-3">홈페이지 영상 수정</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="YouTube 영상 ID *"
              value={editingVideo.videoId}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, videoId: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="영상 제목 *"
              value={editingVideo.title}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, title: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="클라이언트"
              value={editingVideo.client}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, client: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="연도"
              value={editingVideo.year}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, year: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="조회수 (예: 150K+)"
              value={editingVideo.stats.views}
              onChange={(e) =>
                setEditingVideo({
                  ...editingVideo,
                  stats: { ...editingVideo.stats, views: e.target.value },
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="좋아요 (예: 2.5K+)"
              value={editingVideo.stats.likes}
              onChange={(e) =>
                setEditingVideo({
                  ...editingVideo,
                  stats: { ...editingVideo.stats, likes: e.target.value },
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="url"
              placeholder="썸네일 URL"
              value={editingVideo.thumbnail}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, thumbnail: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="url"
              placeholder="영상 URL"
              value={editingVideo.videoUrl}
              onChange={(e) =>
                setEditingVideo({ ...editingVideo, videoUrl: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 sm:col-span-2"
              rows={3}
            />
          </div>

          {/* 태그 관리 */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-semibold text-gray-800">태그 관리</h5>
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                태그 추가
              </button>
            </div>
            <div className="space-y-2">
              {editingVideo.tags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tag.text}
                    onChange={(e) => updateTag(tag.id, "text", e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="태그 텍스트"
                  />
                  <select
                    value={tag.color}
                    onChange={(e) => updateTag(tag.id, "color", e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="potato-orange">주황색</option>
                    <option value="clapperboard-gray">회색</option>
                    <option value="potato-orange-light">연한 주황색</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeTag(tag.id)}
                    className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => setShowEditForm(false)}
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
