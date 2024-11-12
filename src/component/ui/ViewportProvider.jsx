import React from 'react';
import useViewportHeight from './useViewportHeight'; // 동적 높이 훅 가져오기

const ViewportProvider = ({ children }) => {
  useViewportHeight(); // 동적 뷰포트 높이 설정

  return <>{children}</>; // 자식 컴포넌트를 그대로 렌더링
};

export default ViewportProvider;
