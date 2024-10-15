import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid #e6e6e6;
`;

const Cell = styled.div`
  width: 25%; /* 각 칸의 너비를 25%로 설정 */
  text-align: left; /* 왼쪽 정렬 */
  padding-left: 10px; /* 텍스트와 셀의 경계를 일정하게 유지하기 위해 패딩 추가 */
  
`;

function PostItem({ post }) {
  return (
    <Row>
      <Cell>{post.number || "N/A"}</Cell>
      <Cell>{post.subheading || "N/A"}</Cell>
      <Cell>{post.title || "N/A"}</Cell>
      <Cell>{post.designer || "N/A"}</Cell>
    </Row>
  );
}

export default PostItem;
