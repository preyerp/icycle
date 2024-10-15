import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const BottomTxtContent = styled.div`
    font-family: 'OCR A Std', sans-serif;
    width: 100%;
    height: 40px;
    background-color: ${(props) => (props.isAll ? '#f6f6f6' : '#000000')}; /* Change background for "all" */
    z-index: 88;
    position: fixed; /* Fixed positioning for always sticking to the bottom */
    bottom: -1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    box-sizing: border-box;
    text-transform: uppercase;
    font-weight: 300;
`;

const Bcategory = styled.p`
    color: ${(props) => (props.isAll ? '#000' : '#fff')}; /* Change text color based on category */
    font-size: 14px;
    margin: 0;
    flex: ${props => props.width || '1'};
    white-space: nowrap;
    overflow: hidden;
    @media (max-width: 768px) {
            font-size: 12px;
        flex: ${props => props.Mwidth || '1'};
          }
`;
const BcolorWrap = styled.div`
    display: flex;
    flex: ${props => props.width || '1'};
    /* border: 1px solid green; */
    /* justify-content: end; */
    

`
const Bcolor = styled.div`
    display: flex;
    align-items: center;
    /* text-align: right; */
    /* justify-content: end; */
    /* justify-content:flex-start; */
    font-size: 14px;
    width: 95px;
    /* border: 1px solid red; */
    white-space: nowrap;
    overflow: hidden;
    .color-box {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        margin-top: -4px;
        background-color: ${props => props.color};  // Immediate color change
    }
    .hex-code {
        color: ${(props) => (props.isAll ? '#000' : '#fff')}; /* Change text color for hex code */
    }

    @media (max-width: 768px) {
            font-size: 12px;
    margin-left: auto;
  }
`;

const Bcode = styled.p`
    color: ${(props) => (props.isAll ? '#000' : '#e8e8e8')}; /* Change text color based on category */
    font-size: 14px;
    -webkit-font-smoothing: antialiased;  /* 텍스트 렌더링 최적화 */
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    flex: ${props => props.width || '1'};
    white-space: nowrap;
    
    overflow: hidden;

    @media (max-width: 768px) {
    display: none;
  }
`;

const Bcode2 = styled.p`
    color: ${(props) => (props.isAll ? '#000' : '#fff')}; /* Change text color based on category */
    font-size: 14px;
    margin: 0;
    right:0;
    flex: ${props => props.width || '1'};
    white-space: nowrap;
    overflow: hidden;
    @media (max-width: 768px) {
    display: none;
  }
`;

// Function to animate text with a fixed speed
const animateText = (text, callback, speed) => {
    let index = 0;
    const intervalId = setInterval(() => {
        callback(text.slice(0, index + 1));
        index += 1;
        if (index >= text.length) {
            clearInterval(intervalId);
        }
    }, speed);
};

function BottomTxt({ categoryText, colorHex }) {
    const [displayCategoryText, setDisplayCategoryText] = useState('');
    const [displayColorHex, setDisplayColorHex] = useState('');
    const [displayBcode, setDisplayBcode] = useState('');
    const [displayBcode2, setDisplayBcode2] = useState('');
    const [isAnimating, setIsAnimating] = useState(true); // 애니메이션 상태

    // Define individual animation speeds
    const categoryTextSpeed = 50; // Speed for category text animation
    const colorHexSpeed = 80;    // Speed for color hex animation
    const bcodeSpeed = 30;        // Speed for bcode text animation
    const bcode2Speed = 30;       // Speed for bcode2 text animation

    useEffect(() => {
        // Animate only if the page loads (i.e., initial render or when category or color changes)
        setIsAnimating(true);

        const categoryTextToAnimate = `word = "${categoryText}"`;
        const colorHexToAnimate = (categoryText === 'all' && !colorHex) ? '#000000' : (colorHex && colorHex.startsWith('#') ? colorHex : `#${colorHex}`);
        const bcodeText = 'hex_code = word_to_hex(word)';
        const bcode2Text = 'print(hex_code)';

        // Animate texts with specified speeds
        animateText(categoryTextToAnimate, setDisplayCategoryText, categoryTextSpeed);
        animateText(colorHexToAnimate, setDisplayColorHex, colorHexSpeed);
        animateText(bcodeText, setDisplayBcode, bcodeSpeed);
        animateText(bcode2Text, setDisplayBcode2, bcode2Speed);

        // Disable animation after texts are fully updated
        const maxAnimationTime = Math.max(
            categoryTextSpeed * (categoryTextToAnimate.length + 1),
            colorHexSpeed * (colorHexToAnimate.length + 1),
            bcodeSpeed * (bcodeText.length + 1),
            bcode2Speed * (bcode2Text.length + 1)
        );

        const animationTimer = setTimeout(() => {
            setIsAnimating(false);
        }, maxAnimationTime);

        return () => clearTimeout(animationTimer); // Clean up timeout on unmount
    }, [categoryText, colorHex]);

    return (
        <BottomTxtContent isAll={categoryText === 'all'}>
            <Bcategory Mwidth="50%" width="20%" isAll={categoryText === 'all'} animate={isAnimating}>{displayCategoryText}</Bcategory>
            <BcolorWrap width="36%">
                <Bcolor width="36%" isAll={categoryText === 'all'} color={colorHex}>
                    <div className="color-box"></div>
                    <span className="hex-code">{displayColorHex}</span>
                </Bcolor>
            </BcolorWrap>
            <Bcode width="34%" isAll={categoryText === 'all'} animate={isAnimating}>{displayBcode}</Bcode>
            <Bcode2 width="10%" isAll={categoryText === 'all'} animate={isAnimating}>{displayBcode2}</Bcode2>
        </BottomTxtContent>
    );
}

export default BottomTxt;
