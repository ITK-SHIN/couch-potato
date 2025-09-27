import { useApiQuery, useCreateMutation, useUpdateMutation, useDeleteMutation } from './useApi';
import { Category, CategoriesResponse } from '@/types';

// 카테고리 목록 가져오기
export const useCategories = () => {
  return useApiQuery<CategoriesResponse>(
    ['categories'],
    '/api/categories',
    {
      staleTime: 15 * 60 * 1000, // 15분간 fresh (카테고리는 자주 변경되지 않음)
      gcTime: 60 * 60 * 1000, // 1시간간 캐시
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 새로고침 비활성화
    }
  );
};

// 카테고리 추가
export const useAddCategory = () => {
  return useCreateMutation<Category, Omit<Category, 'id'>>(
    '/api/categories',
    [['categories']]
  );
};

// 카테고리 업데이트
export const useUpdateCategory = () => {
  return useUpdateMutation<Category, Partial<Category> & { id: string }>(
    (variables) => `/api/categories/${variables.id}`,
    [['categories']]
  );
};

// 카테고리 삭제
export const useDeleteCategory = () => {
  return useDeleteMutation<Category, string>(
    (id) => `/api/categories/${id}`,
    [['categories']]
  );
};

// 카테고리 순서 업데이트
export const useUpdateCategoryOrder = () => {
  return useUpdateMutation<{ success: boolean }, { categories: Category[] }>(
    '/api/categories/order',
    [['categories']]
  );
};
