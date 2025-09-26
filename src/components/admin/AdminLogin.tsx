"use client";

import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const { login, logout, isAdmin } = useAdmin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(password);
    if (success) {
      setIsOpen(false);
      setPassword("");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (isAdmin) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <span className="text-sm">관리자 모드</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm transition-colors"
      >
        관리자 로그인
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">관리자 로그인</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="관리자 비밀번호를 입력하세요"
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  로그인
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
            <div className="mt-4 text-xs text-gray-500">
              <p>
                테스트용 비밀번호: <strong>admin123</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
