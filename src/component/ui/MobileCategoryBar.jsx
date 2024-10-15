import React from 'react';
import styled from 'styled-components';

const MobileCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CategoryBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  margin-right: 10px;
`;

const CategoryText = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: black;
  text-transform: uppercase;
`;

function MobileCategoryBar({ onCategorySelect }) {
  const categoryColors = {
    all: '#000000',
    "ai & robot": '#D2D6D7',
    "education & kids": '#F2E5A0',
    "health care": '#69e0c8',
    "it & tech": '#4E6873',
    living: '#D7CBBC',
    mobility: '#5E8ABF'
  };

  return (
    <MobileCategoryContainer>
      <CategoryList>
        {Object.keys(categoryColors).map((category) => (
          <CategoryItem
            key={category}
            onClick={() => onCategorySelect(category, categoryColors[category])}  // 카테고리와 색상 전달
          >
            <CategoryBox color={categoryColors[category]} />
            <CategoryText>{category}</CategoryText>
          </CategoryItem>
        ))}
      </CategoryList>
    </MobileCategoryContainer>
  );
}

export default MobileCategoryBar;
