"use client";

import React, { useEffect, useState } from 'react';
import { AppError, getUserFriendlyMessage } from '@/lib/errorHandler';

interface ErrorToastProps {
  error: AppError | null;
  onClose: () => void;
  duration?: number;
}

export default function ErrorToast({ error, onClose, duration = 5000 }: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // 애니메이션 완료 후 제거
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error, duration, onClose]);

  if (!error || !isVisible) return null;

  const message = getUserFriendlyMessage(error);
  const isRetryable = error.type === 'NETWORK_ERROR' || error.type === 'SERVER_ERROR';

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg border-l-4 border-red-800">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-xl">⚠️</span>
          </div>
          
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold mb-1">
              오류가 발생했습니다
            </h3>
            <p className="text-sm opacity-90">
              {message}
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-2">
                <summary className="text-xs cursor-pointer opacity-75">
                  개발자 정보
                </summary>
                <pre className="text-xs mt-1 opacity-75 overflow-auto max-h-20">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
          
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <span className="sr-only">닫기</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {isRetryable && (
          <div className="mt-3">
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="text-xs bg-red-700 hover:bg-red-800 px-3 py-1 rounded transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
