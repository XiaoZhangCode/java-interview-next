import React, { useEffect } from 'react';
import { useLoadingStore } from '@/stores/loadingStore';
import Loading from '../Loading';
import { useRouter } from 'next/navigation';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const { loading, startLoading, stopLoading } = useLoadingStore();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      startLoading();
    };

    const handleStop = () => {
      stopLoading();
    };

    // 监听路由变化
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleStop);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleStop);
    };
  }, [startLoading, stopLoading]);

  return (
    <>
      {loading && <Loading fullScreen />}
      {children}
    </>
  );
};

export default LoadingWrapper; 