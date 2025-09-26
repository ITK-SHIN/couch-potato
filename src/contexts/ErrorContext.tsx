"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AppError, transformToAppError, logError } from '@/lib/errorHandler';
import ErrorToast from '@/components/ErrorToast';

interface ErrorContextType {
  error: AppError | null;
  setError: (error: AppError | null) => void;
  handleError: (error: any, context?: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<AppError | null>(null);

  const handleError = useCallback((error: any, context?: string) => {
    const appError = transformToAppError(error);
    setError(appError);
    logError(appError, context);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, setError, handleError, clearError }}>
      {children}
      <ErrorToast error={error} onClose={clearError} />
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}
