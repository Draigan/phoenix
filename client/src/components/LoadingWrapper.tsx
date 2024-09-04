import React from 'react';
import useLoading from '../hooks/useLoading';

const LoadingWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoading = useLoading();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default LoadingWrapper;

