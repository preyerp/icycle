import React from 'react';
import styled from 'styled-components';

const CategoryText = styled.p`
  font-size: 13px;
  padding: 5px 8px;
  border-radius: 10px;
  background-color: ${props =>
    props.isSelected ? '#000000' : '#f2f2f2'};
  margin-right: ${props => props.margin}px;
  color: ${props => (props.isSelected ? '#FFFFFF' : '#292929')};
  font-weight: normal;
  cursor: pointer;



`;

function Category({ margin, category, onClick, selectedCategory }) {
  const isSelected = category === selectedCategory;

  const handleClick = () => {
    onClick(category);
  };

  return (
    <CategoryText
      margin={margin || 20}
      isSelected={isSelected}
      onClick={handleClick}
    >
      {category}
    </CategoryText>
  );
}

export default Category;
