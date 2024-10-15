import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 화면을 덮는 사각형 컴포넌트
const TransitionOverlay = styled.div`
  position: fixed;
  top: 100%; /* 화면 아래에서 시작 */
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff; /* 사각형의 색상 */
  z-index: 1000; /* 최상위에 위치 */
  transform: ${({ show }) => (show ? 'translateY(-100%)' : 'translateY(0)')}; /* 애니메이션 효과 */
  transition: transform 1s ease-in-out; /* 부드러운 애니메이션 */
`;

const TransitionComponent = ({ children }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const handlePageTransition = (path) => {
    // 화면 전환 애니메이션 시작
    setShowOverlay(true);

    // 1초 후(애니메이션 시간) 페이지 이동
    setTimeout(() => {
      navigate(path); // 페이지 이동
      setShowOverlay(false); // 애니메이션 종료
    }, 1000);
  };

  useEffect(() => {
    // 화면 로드 후 사각형이 자연스럽게 사라지게 만듦
    setShowOverlay(false);
  }, []);

  return (
    <>
      <TransitionOverlay show={showOverlay} />
      <div>
        {children}
        {/* 예: 이동 버튼 */}
        <button onClick={() => handlePageTransition('/nextPage')}>다음 페이지로 이동</button>
      </div>
    </>
  );
};

export default TransitionComponent;
