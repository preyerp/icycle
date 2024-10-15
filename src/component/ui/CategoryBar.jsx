import React, { useState } from 'react';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CategoryLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  margin-right: 4px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Category = styled.div`
  width: ${props => props.expanded ? (props.width || '80px') : '15px'};
  height: 15px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.expanded ? 'white' : props.color};
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  white-space: nowrap;
  text-transform: uppercase;
  line-height: 15px;

  &:hover {
    width: ${props => props.width || '80px'};
    color: white;
  }

  /* 모바일에서는 카테고리 박스 숨기기 */
  @media (max-width: 768px) {
    display: none;
  }
`;

function CategoryBar({ width, selectedCategory, onCategorySelect }) {
  const categoryColors = {
    all: '#000000',
    "ai & robot": '#D2D6D7',
    "education & kids": '#F2E5A0',
    "health care": '#69e0c8',
    "it & tech": '#4E6873',
    living: '#D7CBBC',
    mobility: '#5E8ABF'
  };

  const categoryWidths = {
    all: '80px',
    "ai & robot": '120px',
    "education & kids": '150px',
    "health care": '130px',
    "it&tech": '100px',
    living: '90px',
    mobility: '90px'
  };

  const handleCategoryClick = (text) => {
    const color = categoryColors[text] || '#222222';
    if (typeof onCategorySelect === 'function') {
      onCategorySelect(text, color);
    }
  };

  return (
    <CategoryContainer style={{ width }}>
      <CategoryLabel>Category</CategoryLabel>
      {Object.keys(categoryColors).map((category) => (
        <Category
          key={category}
          color={categoryColors[category]}
          expanded={selectedCategory === category}
          width={categoryWidths[category]}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </Category>
      ))}
    </CategoryContainer>
  );
}

export default CategoryBar;
