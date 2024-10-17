import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const BottomTxtContent = styled.div`
    font-family: 'OCR A Std', sans-serif;
    mix-blend-mode: difference;
    width: 100%;
    height: 100vh;
    z-index: 88;
    position: fixed; /* Fixed positioning for always sticking to the bottom */
    bottom: 2%;
    position: relative;
    padding: 12px 20px;
    box-sizing: border-box;
    text-transform: uppercase;
    font-weight: 300;
`;

const Bcategory = styled.p`
    color: #000; /* Change text color based on category */
    mix-blend-mode: difference;
    font-size: 12px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    
    text-align: left;
    @media (max-width: 768px) {
            font-size: 12px;
          }
`;
const BcolorWrap = styled.div`
    display: flex;
    flex: ${props => props.width || '1'};
    /* border: 1px solid green; */
    /* justify-content: end; */
    

`


const Bcode = styled.p`
    color: #000; /* Change text color based on category */
    mix-blend-mode: difference;
    font-size: 12px;
    -webkit-font-smoothing: antialiased;  /* 텍스트 렌더링 최적화 */
    -moz-osx-font-smoothing: grayscale;
    width: 40px;
    margin: 0;
    white-space: nowrap;
    

`;

const Bcode2 = styled.p`
    color: #000; /* Change text color based on category */
    mix-blend-mode: difference;
    font-size: 12px;
    -webkit-font-smoothing: antialiased;  /* 텍스트 렌더링 최적화 */
    -moz-osx-font-smoothing: grayscale;
    width: 60px;
    margin: 0;
    white-space: nowrap;
`;

const Bcode2Wrapper = styled.div`
    display: flex;
    justify-content: flex-end; /* 수정된 부분 */
    align-items: center; /* 세로 가운데 정렬을 원하면 추가 */
    white-space: nowrap;
    overflow: hidden;
`;

const BigContainer = styled.div`
    display: flex;
    position: absolute;
    width: calc(100vw - 40px);
    bottom: 0;
    align-items: center; /* 세로 가운데 정렬을 원하면 추가 */
`;
const ColumnContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;
const TimeContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: end; /* 세로 가운데 정렬을 원하면 추가 */
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

function MainVideoTxtMobile({ categoryText, colorHex, topic, keyword, time, year }) {
    const [displayCategoryText, setDisplayCategoryText] = useState('');
    const [displayColorHex, setDisplayColorHex] = useState('');
    const [displayBcode, setDisplayBcode] = useState('');
    const [displayBcode2, setDisplayBcode2] = useState('');
    const [isAnimating, setIsAnimating] = useState(true); // 애니메이션 상태

    // Define individual animation speeds
    const categoryTextSpeed = 50; // Speed for category text animation
    const colorHexSpeed = 40;    // Speed for color hex animation
    const bcodeSpeed = 80;        // Speed for bcode text animation
    const bcode2Speed = 70;       // Speed for bcode2 text animation

    useEffect(() => {
        // Animate only if the page loads (i.e., initial render or when category or color changes)
        setIsAnimating(true);

        const categoryTextToAnimate = topic;
        const colorHexToAnimate = keyword;
        const bcodeText = time;
        const bcode2Text = year;

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
    }, [topic, keyword, time, year]);

    return (
        <BottomTxtContent >
            <BigContainer>
                <ColumnContainer>

                    <Bcategory Mwidth="50%" width="20%" animate={isAnimating}>{displayCategoryText}</Bcategory>
                    <Bcode width="50%" animate={isAnimating}>{displayColorHex}</Bcode>
                    <Bcode2 animate={isAnimating}>{displayBcode2}</Bcode2>
                </ColumnContainer>
                <TimeContainer>
                    <Bcode width="20%" animate={isAnimating}>{displayBcode}</Bcode>
                </TimeContainer>
            </BigContainer>
            {/* <BcolorWrap width="36%">
                <Bcolor width="100%" >
                    <div className="color-box"></div>
                    <span className="hex-code">{displayColorHex}</span>
                </Bcolor>
            </BcolorWrap> */}
        </BottomTxtContent>

    );
}

export default MainVideoTxtMobile;
