import React, { useState, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 125%; /* Aspect ratio 3.2:4.2 */
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageGrid = ({ posts }) => {
  const columnCount = 4; // 한 행에 4개의 이미지
  const rowCount = Math.ceil(posts.length / columnCount);
  const columnWidth = 200; // 각 이미지의 너비
  const rowHeight = 250; // 각 이미지의 높이

  return (
    <Grid
      columnCount={columnCount}
      columnWidth={columnWidth}
      height={800} // 전체 그리드의 높이 (뷰포트 크기)
      rowCount={rowCount}
      rowHeight={rowHeight}
      width={800} // 전체 그리드의 너비
      useIsScrolling // 스크롤 중일 때 별도 처리 옵션 활성화
    >
      {({ columnIndex, rowIndex, style, isScrolling }) => {
        const index = rowIndex * columnCount + columnIndex;
        const post = posts[index];
        if (!post) return null;

        return (
          <div style={style}>
            <ImageContainer>
              {/* 스크롤 중이면 저해상도 로딩 이미지나 플레이스홀더를 보여주고, 스크롤이 멈추면 실제 이미지 로드 */}
              {isScrolling ? (
                <div style={{ backgroundColor: '#e0e0e0', width: '100%', height: '100%' }} />
              ) : (
                <Image 
                  src={post.images.thumbnail} 
                  alt={post.title} 
                  loading="lazy"
                />
              )}
            </ImageContainer>
          </div>
        );
      }}
    </Grid>
  );
};

export default ImageGrid;
