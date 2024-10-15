import React from 'react';
import styled from 'styled-components';

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CategoryText = styled.p`
  padding: 5px 8px;
  background-color: #f2f2f2;
  border-radius: 10px;
  font-size: 13px;
  color: #292929;
  margin-bottom: 0;
`;

const ReadText = styled.p`
  color: #757575;
  margin-left: 12px;
`;

const Info = ({ category, read }) => {
  return (
    <InfoWrapper>
      <CategoryText>{category}</CategoryText>
      <ReadText>{read}</ReadText>
    </InfoWrapper>
  );
};

export default Info;
