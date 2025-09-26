"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { AdminContextType } from '@/types';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 세션에서 관리자 상태 확인
    const adminStatus = sessionStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // 간단한 비밀번호 확인 (실제로는 더 안전한 인증을 사용해야 함)
    if (password === "admin123") {
      setIsAdmin(true);
      sessionStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("isAdmin");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
      {isAdmin && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <span className="text-sm">관리자 모드</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-xs transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
