import React, { useState, useEffect } from 'react';

const KeyboardHeightBox = () => {
  const [boxHeight, setBoxHeight] = useState(10); // 초기 높이 10px

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.visualViewport.height;
      const fullHeight = window.innerHeight;
      const keyboardHeight = fullHeight - viewportHeight;

      if (keyboardHeight > 0) {
        setBoxHeight(keyboardHeight); // 키보드 높이로 박스 높이 설정
      } else {
        setBoxHeight(10); // 기본 높이로 복원
      }
    };

    window.visualViewport.addEventListener('resize', handleResize);
    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <input type="text" placeholder="Type here..." style={{ marginBottom: '20px' }} />
      <div
        style={{
          width: '100%',
          height: `${boxHeight}px`,
          backgroundColor: 'lightblue',
          transition: 'height 0.3s ease',
        }}
      >
        Dynamic Height Box
      </div>
    </div>
  );
};

export default KeyboardHeightBox;
