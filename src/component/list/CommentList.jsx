import React from 'react'
import styled from 'styled-components'
import CommentItem from '../page/CommentItem'

const Wrapper=styled.div`
    width: 1080px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

function CommentList(props) {
    const {comments}=props;
  return (
    <Wrapper>
      {comments.map((comment)=>{
        return(
            <CommentItem key={comment.id} comment={comment}></CommentItem>
        )
      })}
    </Wrapper>
  )
}

export default CommentList
