import { useCallback } from 'react';
import { useLoadingStore } from '@/stores/loadingStore';

export const useRequest = () => {
  const { startLoading, stopLoading } = useLoadingStore();

  const request = useCallback(async <T>(promise: Promise<T>): Promise<T> => {
    try {
      startLoading();
      const result = await promise;
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return { request };
}; 