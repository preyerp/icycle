import React from 'react'
import styled from "styled-components";
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

const StyledButton = styled.button`
    padding:8px 16px;
    background:0;
    border:0;
    color:#757575;
    cursor:pointer;
`;


function Button(props){
    const{onClick}=props;
  return (
    <StyledButton onClick={onClick}>
      
      GUESTBOOK
    </StyledButton>
  )
}

export default Button;
