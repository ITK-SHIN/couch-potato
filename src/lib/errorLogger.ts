/**
 * 에러 로깅 및 모니터링 유틸리티
 */

import { AppError } from './errorHandler';

interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  error?: AppError;
  context?: string;
  timestamp: string;
  userAgent?: string;
  url?: string;
  userId?: string;
}

class ErrorLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 100; // 메모리에 보관할 최대 로그 수

  log(entry: Omit<LogEntry, 'timestamp'>) {
    const logEntry: LogEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    // 메모리에 로그 저장
    this.logs.unshift(logEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // 콘솔에 출력
    this.logToConsole(logEntry);

    // 프로덕션에서는 외부 서비스에 전송
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(logEntry);
    }
  }

  private logToConsole(entry: LogEntry) {
    const { level, message, error, context } = entry;
    const logMessage = `[${level.toUpperCase()}] ${message}`;
    const logContext = context ? ` (${context})` : '';
    const errorDetails = error ? `\nError: ${JSON.stringify(error, null, 2)}` : '';

    switch (level) {
      case 'error':
        console.error(logMessage + logContext + errorDetails);
        break;
      case 'warn':
        console.warn(logMessage + logContext + errorDetails);
        break;
      case 'info':
        console.info(logMessage + logContext + errorDetails);
        break;
      case 'debug':
        console.debug(logMessage + logContext + errorDetails);
        break;
    }
  }

  private async sendToExternalService(entry: LogEntry) {
    try {
      // 실제 프로덕션에서는 Sentry, LogRocket, DataDog 등을 사용
      // 예시: 자체 로깅 API에 전송
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      console.error('Failed to send log to external service:', error);
    }
  }

  // 에러 로깅
  logError(error: AppError, context?: string) {
    this.log({
      level: 'error',
      message: `Application error: ${error.message}`,
      error,
      context,
    });
  }

  // 경고 로깅
  logWarning(message: string, context?: string) {
    this.log({
      level: 'warn',
      message,
      context,
    });
  }

  // 정보 로깅
  logInfo(message: string, context?: string) {
    this.log({
      level: 'info',
      message,
      context,
    });
  }

  // 디버그 로깅
  logDebug(message: string, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      this.log({
        level: 'debug',
        message,
        context,
      });
    }
  }

  // 로그 조회
  getLogs(level?: LogEntry['level'], limit?: number): LogEntry[] {
    let filteredLogs = this.logs;
    
    if (level) {
      filteredLogs = this.logs.filter(log => log.level === level);
    }
    
    if (limit) {
      filteredLogs = filteredLogs.slice(0, limit);
    }
    
    return filteredLogs;
  }

  // 로그 초기화
  clearLogs() {
    this.logs = [];
  }

  // 에러 통계
  getErrorStats() {
    const errors = this.logs.filter(log => log.level === 'error');
    const errorTypes = errors.reduce((acc, log) => {
      const errorType = log.error?.type || 'unknown';
      acc[errorType] = (acc[errorType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalErrors: errors.length,
      errorTypes,
      recentErrors: errors.slice(0, 10),
    };
  }
}

// 싱글톤 인스턴스
export const errorLogger = new ErrorLogger();

// 편의 함수들
export const logError = (error: AppError, context?: string) => {
  errorLogger.logError(error, context);
};

export const logWarning = (message: string, context?: string) => {
  errorLogger.logWarning(message, context);
};

export const logInfo = (message: string, context?: string) => {
  errorLogger.logInfo(message, context);
};

export const logDebug = (message: string, context?: string) => {
  errorLogger.logDebug(message, context);
};
