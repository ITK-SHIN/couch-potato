import React, { useMemo, useRef, useCallback } from 'react';
import { deepEqual } from '@/lib/utils';

/**
 * 깊은 비교를 사용한 메모이제이션 훅
 * 객체나 배열의 내용이 변경되었을 때만 재계산
 */
export function useDeepMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const ref = useRef<{ deps: React.DependencyList; value: T }>();
  
  if (!ref.current || !deepEqual(ref.current.deps, deps)) {
    ref.current = { deps, value: factory() };
  }
  
  return ref.current.value;
}

/**
 * 안정적인 참조를 유지하는 메모이제이션 훅
 * 의존성이 변경되지 않으면 이전 참조를 유지
 */
export function useStableMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  const ref = useRef<{ deps: React.DependencyList; value: T }>();
  
  if (!ref.current || !deepEqual(ref.current.deps, deps)) {
    ref.current = { deps, value: factory() };
  }
  
  return ref.current.value;
}

/**
 * 디바운스된 메모이제이션 훅
 * 연속된 변경사항을 디바운스하여 불필요한 재계산 방지
 */
export function useDebouncedMemo<T>(
  factory: () => T,
  deps: React.DependencyList,
  delay: number = 300
): T {
  const [value, setValue] = React.useState<T>(factory);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setValue(factory());
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, deps);
  
  return value;
}

/**
 * 조건부 메모이제이션 훅
 * 특정 조건에서만 메모이제이션 적용
 */
export function useConditionalMemo<T>(
  factory: () => T,
  deps: React.DependencyList,
  condition: boolean
): T {
  return useMemo(() => {
    if (!condition) {
      return factory();
    }
    return factory();
  }, condition ? deps : []);
}

/**
 * 안정적인 콜백 참조 훅
 * 의존성이 변경되지 않으면 동일한 함수 참조 유지
 */
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  const ref = useRef<{ deps: React.DependencyList; callback: T }>();
  
  if (!ref.current || !deepEqual(ref.current.deps, deps)) {
    ref.current = { deps, callback };
  }
  
  return ref.current.callback;
}

/**
 * 성능 측정이 포함된 메모이제이션 훅
 * 개발 환경에서 메모이제이션 성능 측정
 */
export function useMeasuredMemo<T>(
  factory: () => T,
  deps: React.DependencyList,
  name?: string
): T {
  return useMemo(() => {
    if (process.env.NODE_ENV === 'development' && name) {
      const start = performance.now();
      const result = factory();
      const end = performance.now();
      console.log(`${name} memoization took ${end - start}ms`);
      return result;
    }
    return factory();
  }, deps);
}
