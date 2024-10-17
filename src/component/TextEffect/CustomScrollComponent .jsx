import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: auto; /* 기본 스크롤 동작을 유지 */
  padding-right: 10px; /* 콘텐츠 오른쪽에 여유 공간 */
`;

const ScrollContent = styled.div`
  height: 1000px; /* 스크롤 가능한 컨텐츠 높이 */
`;

const CustomScrollbar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
  background: rgba(0, 0, 0, 0); /* 평상시에는 투명 */
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1); /* 호버 시 트랙이 반투명하게 나타남 */
  }
`;

const ScrollHandle = styled.div`
  position: absolute;
  right: 0;
  width: 6px;
  height: ${(props) => props.height}px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 3px;
  cursor: pointer;
  top: ${(props) => props.top}px;
  transition: all 0.3s ease;

  ${CustomScrollbar}:hover & {
    width: 10px; /* 호버 시 스크롤 핸들이 커짐 */
    background: rgba(0, 0, 0, 0.7); /* 불투명해짐 */
  }
`;

const CustomScrollComponent = () => {
  const containerRef = useRef(null);
  const [handleHeight, setHandleHeight] = useState(50);
  const [handleTop, setHandleTop] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const contentHeight = containerRef.current.scrollHeight;
        const ratio = containerHeight / contentHeight;
        setHandleHeight(containerHeight * ratio);
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const contentHeight = containerRef.current.scrollHeight;
        const scrollTop = containerRef.current.scrollTop;
        const scrollRatio = scrollTop / (contentHeight - containerHeight);
        setHandleTop(scrollRatio * (containerHeight - handleHeight));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    containerRef.current.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [handleHeight]);

  const handleDrag = (e) => {
    const startY = e.clientY;
    const startTop = handleTop;

    const onMouseMove = (e) => {
      const deltaY = e.clientY - startY;
      const containerHeight = containerRef.current.clientHeight;
      const contentHeight = containerRef.current.scrollHeight;
      const newTop = startTop + deltaY;
      const scrollRatio = newTop / (containerHeight - handleHeight);
      containerRef.current.scrollTop = scrollRatio * (contentHeight - containerHeight);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <ScrollContainer ref={containerRef}>
      <ScrollContent>
        {/* 스크롤 가능한 컨텐츠 */}
        <p>여기에 스크롤할 컨텐츠가 들어갑니다.</p>
        <p>더 많은 컨텐츠...</p>
        <p>더 많은 컨텐츠...</p>
        <p>더 많은 컨텐츠...</p>
      </ScrollContent>
      <CustomScrollbar>
        <ScrollHandle
          height={handleHeight}
          top={handleTop}
          onMouseDown={handleDrag}
        />
      </CustomScrollbar>
    </ScrollContainer>
  );
};

export default CustomScrollComponent;
