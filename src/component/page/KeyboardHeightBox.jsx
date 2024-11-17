import React, { useState, useEffect } from 'react';

const KeyboardHeightBox = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(10); // 초기 높이 10px

  useEffect(() => {
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      if (currentHeight < initialHeight) {
        setKeyboardHeight(initialHeight - currentHeight); // 키보드 높이로 변경
      } else {
        setKeyboardHeight(10); // 초기 높이로 복귀
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: '100px',
        height: `${keyboardHeight}px`,
        backgroundColor: 'blue',
        transition: 'height 0.3s ease', // 부드러운 애니메이션 효과
      }}
    >
      {/* 직사각형 */}
    </div>
  );
};

export default KeyboardHeightBox;
