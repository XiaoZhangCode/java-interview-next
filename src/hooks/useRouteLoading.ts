import { useEffect } from 'react';
import { useLoadingStore } from '@/stores/loadingStore';
import { usePathname, useSearchParams } from 'next/navigation';

export const useRouteLoading = () => {
  const { startLoading, stopLoading } = useLoadingStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
      stopLoading();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams, startLoading, stopLoading]);
}; 