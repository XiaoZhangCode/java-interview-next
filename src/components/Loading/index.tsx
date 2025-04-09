import React from 'react';
import { Spin } from 'antd';
import styles from './index.module.css';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  return (
    <div className={`${styles.loadingContainer} ${fullScreen ? styles.fullScreen : ''}`}>
      <Spin size="large" />
    </div>
  );
};

export default Loading; 