import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Category {
  id: string;
  name: string;
  icon: string;
  order: number;
}

interface CategoriesResponse {
  categories: Category[];
}

// 카테고리 목록 가져오기
export const useCategories = () => {
  return useQuery<CategoriesResponse>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('카테고리를 불러오는데 실패했습니다.');
      }
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10분간 fresh (카테고리는 자주 변경되지 않음)
    gcTime: 30 * 60 * 1000, // 30분간 캐시
  });
};

// 카테고리 추가
export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryData: Omit<Category, 'id'>) => {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('카테고리 추가에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// 카테고리 업데이트
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...categoryData }: Partial<Category> & { id: string }) => {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('카테고리 업데이트에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// 카테고리 삭제
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('카테고리 삭제에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// 카테고리 순서 업데이트
export const useUpdateCategoryOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categories: Category[]) => {
      const response = await fetch('/api/categories/order', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories }),
      });

      if (!response.ok) {
        throw new Error('카테고리 순서 업데이트에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
