import React from 'react'
import styled from "styled-components";

const StyledButton = styled.button`
    padding:8px 16px;
    border:0;
    background-color: #191919;
    color:#ffffff;
    cursor:pointer;
    width: 80px;
    height: 60px;
    border-radius: 0 6px 6px 0;
    
`;


const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

function Commentbutton(props){
    const { onClick } = props;
    return (
        <ButtonContainer>
            <StyledButton onClick={onClick}>
            Writing
            </StyledButton>
        </ButtonContainer>
    )
}

export default Commentbutton;
