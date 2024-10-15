import React from 'react'
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    width: ${props => props.width};
    height: ${props => props.height}px;
    padding: 8px;
    font-size: 16px;
    line-height: 20px;
    display: block;
    resize: none;
    border: 1px solid #e6e6e6;
    border-radius: ${props => props.borderRadius}px;
    outline: none;
    

    &::placeholder {
        color: ${props => props.placeholderColor || '#888'};
        font-size: ${props => props.placeholderFontSize || '16px'};
    }
`

function TextInputWrite(props){
    const { 
        border, 
        width, 
        height, 
        value, 
        onChange, 
        placeholder, 
        placeholderColor, 
        placeholderFontSize 
    } = props;
    return (
        <StyledTextArea 
            borderRadius={border || 6} 
            height={height || 20} 
            width={width || '100%'} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder}
            placeholderColor={placeholderColor}
            placeholderFontSize={placeholderFontSize}
        />
    )
}

export default TextInputWrite
